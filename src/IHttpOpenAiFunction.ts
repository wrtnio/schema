import { IHttpLlmFunction } from "@samchon/openapi";

import { IOpenAiSchema } from "./IOpenAiSchema";
import { ISwaggerMigrateRoute } from "./ISwaggerMigrateRoute";
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
 * @author Samchon
 */
export type IHttpOpenAiFunction = IHttpLlmFunction<
  IOpenAiSchema,
  ISwaggerOperation,
  ISwaggerMigrateRoute
>;
export namespace IHttpOpenAiFunction {
  /**
   * Collection of separated parameters.
   */
  export type ISeparated = IHttpLlmFunction.ISeparated<IOpenAiSchema>;

  /**
   * Separated parameter.
   */
  export type ISeparatedParameter =
    IHttpLlmFunction.ISeparatedParameter<IOpenAiSchema>;
}
