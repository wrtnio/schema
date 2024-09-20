import { ILlmFunction } from "@samchon/openapi/lib/structures/ILlmFunction";

import { IOpenAiSchema } from "./IOpenAiSchema";

/**
 * OpenAI (LLM) function metadata.
 *
 * `IOpenAiFunction` is an interface representing a function metadata,
 * which has been used for the LLM (Language Large Model) function
 * calling. Also, it's a function structure containing the function
 * {@link name}, {@link parameters} and {@link output return type}.
 *
 * If you provide this `IOpenAiFunction` data to the LLM provider like "OpenAI",
 * the "OpenAI" will compose a function arguments by analyzing conversations
 * with the user. With the LLM composed arguments, you can execute the function
 * and get the result.
 *
 * By the way, do not ensure that LLM will always provide the correct
 * arguments. The LLM of present age is not perfect, so that you would
 * better to validate the arguments before executing the function.
 * I recommend you to validate the arguments before execution by using
 * [`typia`](https://github.com/samchon/typia) library.
 *
 * @reference https://platform.openai.com/docs/guides/function-calling
 * @author Samchon
 */
export type IOpenAiFunction = ILlmFunction<IOpenAiSchema>;
export namespace IOpenAiFunction {
  /**
   * Collection of separated parameters.
   */
  export type ISeparated = ILlmFunction.ISeparated<IOpenAiSchema>;

  /**
   * Separated parameter.
   */
  export type ISeparatedParameter =
    ILlmFunction.ISeparatedParameter<IOpenAiSchema>;
}
