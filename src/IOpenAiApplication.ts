import { ILlmApplication } from "@samchon/openapi";

import { IOpenAiSchema } from "./IOpenAiSchema";

/**
 * Application of OpenAI (LLM) function calling.
 *
 * `IOpenAiApplication` is a data structure representing a collection of
 * {@link IOpenAiFunction LLM function calling schemas}, composed from a native
 * TypeScript class (or interface) type by the `typia.llm.application<App>()`
 * function.
 *
 * By the way, the LLM function calling application composition, converting
 * `IOpenAiApplication` instance from TypeScript interface (or class) type is not always
 * successful. As LLM provider like OpenAI cannot understand the recursive reference
 * type that is embodied by {@link OpenApi.IJsonSchema.IReference}, if there're some
 * recursive types in the TypeScript interface (or class) type, the conversion would
 * be failed.
 *
 * Also, there can be some parameters (or their nested properties) which must be
 * composed by Human, not by LLM. File uploading feature or some sensitive information
 * like secrety key (password) are the examples. In that case, you can separate the
 * function parameters to both LLM and human sides by configuring the
 * {@link IOpenAiApplication.IOptions.separate} property. The separated parameters are
 * assigned to the {@link IOpenAiFunction.separated} property.
 *
 * For reference, when both LLM and Human filled parameter values to call, you can
 * merge them by calling the {@link HttpLlm.mergeParameters} function. In other words,
 * if you've configured the {@link IOpenAiApplication.IOptions.separate} property,
 * you have to merge the separated parameters before the funtion call execution.
 *
 * @reference https://platform.openai.com/docs/guides/function-calling
 * @author Samchon
 */
export type IOpenAiApplication = ILlmApplication<IOpenAiSchema>;
export namespace IOpenAiApplication {
  /**
   * Options for composing the LLM application.
   */
  export type IOptions = ILlmApplication.IOptions<IOpenAiSchema>;
}
