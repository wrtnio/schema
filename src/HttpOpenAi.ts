import {
  HttpLlm,
  IHttpConnection,
  IHttpLlmApplication,
  IHttpLlmFunction,
} from "@samchon/openapi";

import { IHttpOpenAiApplication } from "./IHttpOpenAiApplication";
import { IHttpOpenAiFunction } from "./IHttpOpenAiFunction";
import { ISwagger } from "./ISwagger";

export namespace HttpOpenAi {
  /* -----------------------------------------------------------
    APPLICATION
  ----------------------------------------------------------- */
  export const application = (props: {
    document: ISwagger;
    options?: Partial<IHttpOpenAiApplication.IOptions>;
  }): IHttpOpenAiApplication => {
    const app: IHttpLlmApplication<"3.0"> = HttpLlm.application({
      model: "3.0",
      document: props.document,
      options: props.options,
    });
    return {
      ...app,
      functions: app.functions.map(functional),
    };
  };

  const functional = (
    keyword: IHttpLlmFunction<"3.0">,
  ): IHttpOpenAiFunction => {
    const properties = new Map(
      Object.keys(keyword.parameters.properties).map((name, i) => [name, i]),
    );
    return {
      ...keyword,
      keyword: keyword.parameters,
      parameters: Object.values(keyword.parameters.properties),
      separated: keyword.separated
        ? {
            llm: Object.entries(keyword.separated.llm?.properties ?? {}).map(
              ([key, value]) => ({
                schema: value,
                index: properties.get(key) ?? 0,
              }),
            ),
            human: Object.entries(
              keyword.separated.human?.properties ?? {},
            ).map(([key, value]) => ({
              schema: value,
              index: properties.get(key) ?? 0,
            })),
            keyword: keyword.separated,
          }
        : undefined,
    };
  };

  /* -----------------------------------------------------------
    FETCHERS
  ----------------------------------------------------------- */
  export interface IFetchProps {
    connection: IHttpConnection;
    application: IHttpOpenAiApplication;
    function: IHttpOpenAiFunction;
    arguments: unknown[];
  }

  export const execute = async (props: IFetchProps): Promise<unknown> =>
    HttpLlm.execute(getProps(props));

  export const propagate = async (props: IFetchProps): Promise<unknown> =>
    HttpLlm.propagate(getProps(props));

  const getProps = (props: IFetchProps): HttpLlm.IFetchProps<"3.0"> => {
    const keys: string[] = Object.keys(props.function.keyword.properties);
    const input: Record<string, unknown> = Object.fromEntries(
      props.arguments.map((arg, i) => [keys[i], arg]),
    );
    return {
      connection: props.connection,
      application: {
        ...props.application,
        functions: [],
      },
      function: {
        ...props.function,
        parameters: props.function.keyword,
        separated: props.function.separated?.keyword,
      },
      input,
    };
  };

  /* -----------------------------------------------------------
    MERGERS
  ----------------------------------------------------------- */
  export interface IMergeProps {
    function: IHttpOpenAiFunction;
    llm: unknown[];
    human: unknown[];
  }

  export const mergeParameters = (props: IMergeProps): unknown[] => {
    const separated: IHttpOpenAiFunction.ISeparated | undefined =
      props.function.separated;
    if (separated === undefined)
      throw new Error(
        "Error on OpenAiDataComposer.parameters(): the function parameters are not separated.",
      );
    return new Array(props.function.parameters.length).fill(0).map((_, i) => {
      const llm: number = separated.llm.findIndex((p) => p.index === i);
      const human: number = separated.human.findIndex((p) => p.index === i);
      if (llm === -1 && human === -1)
        throw new Error(
          "Error on OpenAiDataComposer.parameters(): failed to gather separated arguments, because both LLM and human sides are all empty.",
        );
      return mergeValue(props.llm[llm], props.human[human]);
    });
  };

  export const mergeValue = (x: unknown, y: unknown): unknown =>
    typeof x === "object" && typeof y === "object" && x !== null && y !== null
      ? combineObject(x, y)
      : Array.isArray(x) && Array.isArray(y)
        ? new Array(Math.max(x.length, y.length))
            .fill(0)
            .map((_, i) => mergeValue(x[i], y[i]))
        : (y ?? x);

  const combineObject = (x: any, y: any): any => {
    const output: any = { ...x };
    for (const [k, v] of Object.entries(y)) output[k] = mergeValue(x[k], v);
    return output;
  };
}
