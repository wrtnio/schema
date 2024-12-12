import { IHttpOpenAiFunction } from "../IHttpOpenAiFunction";
import { IOpenAiSchema } from "../IOpenAiSchema";
import { OpenAiTypeChecker } from "../OpenAiTypeChecker";

export namespace HttpOpenAiSeparator {
  export interface IProps {
    parameters: IOpenAiSchema[];
    predicator: (schema: IOpenAiSchema) => boolean;
  }

  export const parameters = (props: IProps): IHttpOpenAiFunction.ISeparated => {
    const indexes: Array<[IOpenAiSchema | null, IOpenAiSchema | null]> =
      props.parameters.map(schema(props.predicator));
    return {
      llm: indexes
        .map(([llm], index) => ({
          index,
          schema: llm!,
        }))
        .filter(({ schema }) => schema !== null),
      human: indexes
        .map(([, human], index) => ({
          index,
          schema: human!,
        }))
        .filter(({ schema }) => schema !== null),
    };
  };

  export const schema =
    (predicator: (schema: IOpenAiSchema) => boolean) =>
    (input: IOpenAiSchema): [IOpenAiSchema | null, IOpenAiSchema | null] => {
      if (predicator(input) === true) return [null, input];
      else if (
        OpenAiTypeChecker.isUnknown(input) ||
        OpenAiTypeChecker.isOneOf(input)
      )
        return [input, null];
      else if (OpenAiTypeChecker.isObject(input))
        return separateObject(predicator)(input);
      else if (OpenAiTypeChecker.isArray(input))
        return separateArray(predicator)(input);
      return [input, null];
    };

  const separateArray =
    (predicator: (schema: IOpenAiSchema) => boolean) =>
    (
      input: IOpenAiSchema.IArray,
    ): [IOpenAiSchema.IArray | null, IOpenAiSchema.IArray | null] => {
      const [x, y] = schema(predicator)(input.items);
      return [
        x !== null ? { ...input, items: x } : null,
        y !== null ? { ...input, items: y } : null,
      ];
    };

  const separateObject =
    (predicator: (schema: IOpenAiSchema) => boolean) =>
    (
      input: IOpenAiSchema.IObject,
    ): [IOpenAiSchema.IObject | null, IOpenAiSchema.IObject | null] => {
      if (
        Object.keys(input.properties ?? {}).length === 0 &&
        !!input.additionalProperties === false
      )
        return [input, null];

      const llm = {
        ...input,
        properties: {} as Record<string, IOpenAiSchema>,
      } satisfies IOpenAiSchema.IObject;
      const human = {
        ...input,
        properties: {} as Record<string, IOpenAiSchema>,
      } satisfies IOpenAiSchema.IObject;

      for (const [key, value] of Object.entries(input.properties ?? {})) {
        const [x, y] = schema(predicator)(value);
        if (x !== null) llm.properties[key] = x;
        if (y !== null) human.properties[key] = y;
      }
      if (
        typeof input.additionalProperties === "object" &&
        input.additionalProperties !== null
      ) {
        const [dx, dy] = schema(predicator)(input.additionalProperties);
        llm.additionalProperties = dx ?? false;
        human.additionalProperties = dy ?? false;
      }
      return [
        Object.keys(llm.properties).length === 0 ? null : shrinkRequired(llm),
        Object.keys(human.properties).length === 0
          ? null
          : shrinkRequired(human),
      ];
    };

  const shrinkRequired = (
    input: IOpenAiSchema.IObject,
  ): IOpenAiSchema.IObject => {
    if (input.required !== undefined)
      input.required = input.required.filter(
        (key) => input.properties?.[key] !== undefined,
      );
    return input;
  };
}
