import { IHttpLlmApplication } from "@samchon/openapi";

import { IOpenAiSchema } from "./IOpenAiSchema";
import { ISwaggerMigrateRoute } from "./ISwaggerMigrateRoute";
import { ISwaggerOperation } from "./ISwaggerOperation";

/**
 * Application of OpenAI (LLM) function call from OpenAPI document.
 *
 * `IHttpOpenAiApplication` is a data structure representing a collection of
 * {@link IOpenAiFunction LLM function calling schemas} composed from the
 * {@link ISwagger OpenAPI document} and its {@link ISwaggerOperation operation}
 * metadata. It also contains {@link IHttpOpenAiApplication.errors failed operations}, and
 * adjusted {@link IHttpOpenAiApplication.options options} during the
 * `IHttpOpenAiApplication` construction.
 *
 * About the {@link ISwaggerOperation API operations}, they are converted to
 * {@link IOpenAiFunction} type which represents LLM function calling schema.
 * By the way, if tehre're some recursive types which can't escape the
 * {@link ISwaggerSchema.IReference} type, the operation would be failed and
 * pushed into the {@link IHttpOpenAiApplication.errors}. Otherwise not, the operation
 * would be successfully converted to {@link IOpenAiFunction} and its type schemas
 * are downgraded to {@link OpenApiV3.IJsonSchema} and converted to {@link ILlmSchema}.
 *
 * About the options, if you've configured {@link IHttpOpenAiApplication.options.keyword}
 * (as `true`), number of {@link IOpenAiFunction.parameters} are always 1 and the first
 * parameter type is always {@link ILlmSchema.IObject}. Otherwise, the parameters would
 * be multiple, and the sequence of the parameters are following below rules.
 *
 * - `pathParameters`: Path parameters of {@link IHttpMigrateRoute.parameters}
 * - `query`: Query parameter of {@link IHttpMigrateRoute.query}
 * - `body`: Body parameter of {@link IHttpMigrateRoute.body}
 *
 * ```typescript
 * // KEYWORD TRUE
 * {
 *   ...pathParameters,
 *   query,
 *   body,
 * }
 *
 * // KEYWORD FALSE
 * [
 *   ...pathParameters,
 *   ...(query ? [query] : []),
 *   ...(body ? [body] : []),
 * ]
 * ```
 *
 * By the way, there can be some parameters (or their nested properties) which must be
 * composed by Human, not by LLM. File uploading feature or some sensitive information
 * like secrety key (password) are the examples. In that case, you can separate the
 * function parameters to both LLM and Human sides by configuring the
 * {@link IHttpOpenAiApplication.IOptions.separate} property. The separated parameters are
 * assigned to the {@link IOpenAiFunction.separated} property.
 *
 * For reference, the actual function call execution is not by LLM, but by you.
 * When the LLM selects the proper function and fills the arguments, you just call
 * the function by {@link HttpLlm.execute} with the LLM prepared arguments. And then
 * informs the return value to the LLM by system prompt. The LLM will continue the next
 * conversation based on the return value.
 *
 * Additionally, if you've configured {@link IHttpOpenAiApplication.IOptions.separate},
 * so that the parameters are separated to Human and LLM sides, you can merge these
 * humand and LLM sides' parameters into one through {@link HttpLlm.mergeParameters}
 * before the actual LLM function call execution.
 *
 * @reference https://platform.openai.com/docs/guides/function-calling
 * @author Samchon
 */
export type IHttpOpenAiApplication = IHttpLlmApplication<
  IOpenAiSchema,
  ISwaggerOperation,
  ISwaggerMigrateRoute
>;
export namespace IHttpOpenAiApplication {
  /**
   * Error occurred in the composition.
   */
  export type IError = IHttpLlmApplication.IError<
    ISwaggerOperation,
    ISwaggerMigrateRoute
  >;

  /**
   * Options for composing the LLM application.
   */
  export type IOptions = IHttpLlmApplication.IOptions<IOpenAiSchema>;
}
