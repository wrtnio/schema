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
  extends Omit<IHttpLlmFunction<"3.0">, "parameters" | "separated"> {
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
   * Collection of separated parameters.
   *
   * Filled only when {@link IHttpOpenAiApplication.IOptions.separate} is configured.
   */
  separated?: IHttpOpenAiFunction.ISeparated;
}
export namespace IHttpOpenAiFunction {
  export interface IOptions extends IOpenAiSchema.IConfig {
    separate: null | ((schema: IOpenAiSchema) => boolean);
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
