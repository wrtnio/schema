import {
  HttpLlm,
  IHttpConnection,
  IHttpLlmApplication,
  IHttpLlmFunction,
  IHttpResponse,
} from "@samchon/openapi";
import { LlmSchemaComposer } from "@samchon/openapi/lib/composers/LlmSchemaComposer";

import { IHttpOpenAiApplication } from "./IHttpOpenAiApplication";
import { IHttpOpenAiFunction } from "./IHttpOpenAiFunction";
import { IOpenAiSchema } from "./IOpenAiSchema";
import { ISwagger } from "./ISwagger";
import { ISwaggerComponents } from "./ISwaggerComponents";
import { ISwaggerSchema } from "./ISwaggerSchema";
import { HttpOpenAiFetcher } from "./internal/HttpOpenAiFetcher";
import { HttpOpenAiSeparator } from "./internal/HttpOpenAiSeparator";

export namespace HttpOpenAi {
  /* -----------------------------------------------------------
    COMPOSERS
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
      openapi: "3.0.3",
    };
  };

  export const schema = (props: {
    components: ISwaggerComponents;
    schema: ISwaggerSchema;
  }): IOpenAiSchema | null => {
    const result = LlmSchemaComposer.schema("3.0")({
      config: LlmSchemaComposer.defaultConfig("3.0"),
      components: props.components,
      schema: props.schema,
    });
    return result.success ? result.value : null;
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

  export const execute = (props: IFetchProps): Promise<unknown> =>
    HttpOpenAiFetcher.execute(props);

  export const propagate = (props: IFetchProps): Promise<IHttpResponse> =>
    HttpOpenAiFetcher.propagate(props);

  /* -----------------------------------------------------------
    MERGERS
  ----------------------------------------------------------- */
  /**
   * Properties of {@link mergeParameters} function.
   */
  export interface IMergeProps {
    /**
     * Target function to call.
     */
    function: IHttpOpenAiFunction;

    /**
     * Arguments composed by LLM (Large Language Model).
     */
    llm: unknown[];

    /**
     * Arguments composed by human.
     */
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

  /* -----------------------------------------------------------
    SEPARATORS
  ----------------------------------------------------------- */
  export interface ISeparateProps {
    parameters: IOpenAiSchema[];
    predicator: (schema: IOpenAiSchema) => boolean;
  }

  export const separateParameters = (
    props: ISeparateProps,
  ): IHttpOpenAiFunction.ISeparated => HttpOpenAiSeparator.parameters(props);

  export const separateSchema =
    (predicator: (schema: IOpenAiSchema) => boolean) =>
    (input: IOpenAiSchema): [IOpenAiSchema | null, IOpenAiSchema | null] =>
      HttpOpenAiSeparator.schema(predicator)(input);
}
