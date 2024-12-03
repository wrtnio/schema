import { IHttpLlmFunction } from "@samchon/openapi";

import { IOpenAiSchema } from "./IOpenAiSchema";
import { ISwaggerOperation } from "./ISwaggerOperation";

/**
 * OpenAI (LLM) function calling schema from HTTP (OpenAPI) operation.
 *
 * `IHttpOpenAiFunction` is a data structure representing a function converted
 * from the {@link ISwaggerOperation OpenAPI operation}, used for the LLM
 * (Large Language Model) function calling. It's a typical RPC (Remote Procedure Call)
 * structure containing the function {@link name}, {@link parameters}, and
 * {@link output return type}.
 *
 * If you provide this `IHttpOpenAiFunction` data to the LLM provider like "OpenAI",
 * the "OpenAI" will compose a function arguments by analyzing conversations with
 * the user. With the LLM composed arguments, you can execute the function through
 * {@link LlmFetcher.execute} and get the result.
 *
 * For reference, different between `IHttpOpenAiFunction` and its origin source
 * {@link ISwaggerOperation} is, `IHttpOpenAiFunction` has converted every type schema
 * informations from {@link ISwaggerSchema} to {@link IOpenAiSchema} to escape
 * {@link ISwaggerSchema.IReference reference types}, and downgrade the version
 * of the JSON schema to OpenAPI 3.0. It's because LLM function call feature cannot
 * understand both reference types and OpenAPI 3.1 specification.
 *
 * Additionally, if you've composed `IHttpOpenAiFunction` with
 * {@link IHttpLlmApplication.IOptions.keyword} configuration as `true`, number of
 * {@link IHttpOpenAiFunction.parameters} are always 1 and the first parameter's
 * type is always {@link IOpenAiSchema.IObject}. The properties' rule is:
 *
 * - `pathParameters`: Path parameters of {@link ISwaggerOperation.parameters}
 * - `query`: Query parameter of {@link IHttpMigrateRoute.query}
 * - `body`: Body parameter of {@link IHttpMigrateRoute.body}
 *
 * ```typescript
 * {
 *   ...pathParameters,
 *   query,
 *   body,
 * }
 * ```
 *
 * Otherwise, the parameters would be multiple, and the sequence of the parameters
 * are following below rules:
 *
 * ```typescript
 * [
 *   ...pathParameters,
 *   ...(query ? [query] : []),
 *   ...(body ? [body] : []),
 * ]
 * ```
 *
 * @reference https://platform.openai.com/docs/guides/function-calling
 * @deprecated OpenAI's JSON schema specification has been changed
 * @author Samchon
 */
export interface IHttpOpenAiFunction
  extends Omit<IHttpLlmFunction<"3.0">, "parameters" | "separated" | "output"> {
  /**
   * List of parameter types.
   *
   * If you've configured {@link IHttpOpenAiApplication.IOptions.keyword} as
   * `true`, number of {@link IHttpOpenAiFunction.parameters} are always 1 and
   * the first parameter's type is always {@link IOpenAiSchema.IObject}. The
   * properties' rule is:
   *
   * - `pathParameters`: Path parameters of {@link IHttpMigrateRoute.parameters}
   * - `query`: Query parameter of {@link IHttpMigrateRoute.query}
   * - `body`: Body parameter of {@link IHttpMigrateRoute.body}
   *
   * ```typescript
   * {
   *   ...pathParameters,
   *   query,
   *   body,
   * }
   * ```
   *
   * Otherwise, the parameters would be multiple, and the sequence of the
   * parameters are following below rules:
   *
   * ```typescript
   * [
   *   ...pathParameters,
   *   ...(query ? [query] : []),
   *   ...(body ? [body] : []),
   * ]
   * ```
   */
  parameters: IOpenAiSchema[];

  /**
   * Expected return type.
   *
   * If the function returns nothing (`void`), then the output is `undefined`.
   */
  output?: IOpenAiSchema | undefined;

  /**
   * Collection of separated parameters.
   *
   * Filled only when {@link IHttpOpenAiApplication.IOptions.separate} is configured.
   */
  separated?: IHttpOpenAiFunction.ISeparated;
}
export namespace IHttpOpenAiFunction {
  export interface IOptions {
    /**
     * Separator function for the parameters.
     *
     * When composing parameter arguments through LLM function call,
     * there can be a case that some parameters must be composed by human,
     * or LLM cannot understand the parameter.
     *
     * For example, if the parameter type has configured
     * {@link IOpenAiSchema.IString.contentMediaType} which indicates file
     * uploading, it must be composed by human, not by LLM
     * (Large Language Model).
     *
     * In that case, if you configure this property with a function that
     * predicating whether the schema value must be composed by human or
     * not, the parameters would be separated into two parts.
     *
     * - {@link IHttpOpenAiFunction.separated.llm}
     * - {@link IHttpOpenAiFunction.separated.human}
     *
     * When writing the function, note that returning value `true` means
     * to be a human composing the value, and `false` means to LLM
     * composing the value. Also, when predicating the schema, it would
     * better to utilize the {@link GeminiTypeChecker} like features.
     *
     * @param schema Schema to be separated.
     * @returns Whether the schema value must be composed by human or not.
     * @default null
     */
    separate: null | ((schema: IOpenAiSchema) => boolean);

    /**
     * Whether to allow recursive types or not.
     *
     * If allow, then how many times to repeat the recursive types.
     *
     * By the way, if the model is "chatgpt", the recursive types are always
     * allowed without any limitation, due to it supports the reference type.
     *
     * @default 3
     */
    recursive: false | number;
  }

  /**
   * Collection of separated parameters.
   */
  export interface ISeparated {
    /**
     * Parameters that would be composed by the LLM.
     */
    llm: ISeparatedParameter[];

    /**
     * Parameters that would be composed by the human.
     */
    human: ISeparatedParameter[];
  }

  /**
   * Separated parameter.
   */
  export interface ISeparatedParameter {
    /**
     * Index of the parameter.
     *
     * @type uint
     */
    index: number;

    /**
     * Type schema info of the parameter.
     */
    schema: IOpenAiSchema;
  }
}
