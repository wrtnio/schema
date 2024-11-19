import { ILlmSchema } from "@samchon/openapi";

import { ISwaggerSchemaCommonPlugin } from "./ISwaggerSchemaCommonPlugin";
import { ISwaggerSchemaPaymentPlugin } from "./ISwaggerSchemaPaymentPlugin";
import { ISwaggerSchemaSecurityPlugin } from "./ISwaggerSchemaSecurityPlugin";

/**
 * Type schema info of OpenAI (LLM) function call.
 *
 * `IOpenAiSchema` is a type schema info of OpenAI function call.
 *
 * `IOpenAiSchema` is basically follows the JSON schema definition of
 * OpenAI v3.0: {@link OpenApiV3.IJsonSchema}. However, `IOpenAiSchema` does not
 * have the reference type {@link OpenApiV3.IJsonSchema.IReference}. It's because
 * the OpenAI cannot compose
 * {@link OpenAiFetcher.IProps.arguments function call arguments} of
 * the reference type.
 *
 * For reference, the OpenAPI v3.0 based JSON schema definition can't express
 * the tuple array type. It has been supported since OpenAPI v3.1. Therefore,
 * it would better to avoid using the tuple array type.
 *
 * @reference https://platform.openai.com/docs/guides/function-calling
 * @author Samchon
 */
export type IOpenAiSchema =
  | IOpenAiSchema.IBoolean
  | IOpenAiSchema.IInteger
  | IOpenAiSchema.INumber
  | IOpenAiSchema.IString
  | IOpenAiSchema.IArray
  | IOpenAiSchema.IObject
  | IOpenAiSchema.IUnknown
  | IOpenAiSchema.INullOnly
  | IOpenAiSchema.IOneOf;
export namespace IOpenAiSchema {
  /**
   * Boolean type schema info.
   */
  export interface IBoolean
    extends ILlmSchema.IBoolean,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Integer type schema info.
   */
  export interface IInteger
    extends ILlmSchema.IInteger,
      ISwaggerSchemaCommonPlugin,
      ISwaggerSchemaPaymentPlugin.INumeric {}

  /**
   * Number type schema info.
   */
  export interface INumber
    extends ILlmSchema.INumber,
      ISwaggerSchemaCommonPlugin,
      ISwaggerSchemaPaymentPlugin.INumeric {}

  /**
   * String type schema info.
   */
  export interface IString
    extends ILlmSchema.IString,
      ISwaggerSchemaCommonPlugin,
      ISwaggerSchemaPaymentPlugin.IString,
      ISwaggerSchemaSecurityPlugin {}

  /**
   * Array type schema info.
   */
  export interface IArray
    extends Omit<ILlmSchema.IArray, "items">,
      ISwaggerSchemaCommonPlugin {
    /**
     * Items type schema info.
     *
     * The `items` means the type of the array elements. In other words, it is
     * the type schema info of the `T` in the TypeScript array type `Array<T>`.
     */
    items: IOpenAiSchema;
  }

  /**
   * Object type schema info.
   */
  export interface IObject
    extends Omit<ILlmSchema.IObject, "properties" | "additionalProperties">,
      ISwaggerSchemaCommonPlugin {
    /**
     * Properties of the object.
     *
     * The `properties` means a list of key-value pairs of the object's
     * regular properties. The key is the name of the regular property,
     * and the value is the type schema info.
     *
     * If you need additional properties that is represented by dynamic key,
     * you can use the {@link additionalProperties} instead.
     */
    properties?: Record<string, IOpenAiSchema>;

    /**
     * Additional properties' info.
     *
     * The `additionalProperties` means the type schema info of the additional
     * properties that are not listed in the {@link properties}.
     *
     * If the value is `true`, it means that the additional properties are not
     * restricted. They can be any type. Otherwise, if the value is
     * {@link ILlmSchema} type, it means that the additional properties must
     * follow the type schema info.
     *
     * - `true`: `Record<string, any>`
     * - `ILlmSchema`: `Record<string, T>`
     */
    additionalProperties?: boolean | IOpenAiSchema;
  }

  /**
   * Unknown type schema info.
   *
   * It means the type of the value is `any`.
   */
  export interface IUnknown
    extends ILlmSchema.IUnknown,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Null only type schema info.
   */
  export interface INullOnly
    extends ILlmSchema.INullOnly,
      ISwaggerSchemaCommonPlugin {}

  /**
   * One of type schema info.
   *
   * `IOneOf` represents an union type of the TypeScript (`A | B | C`).
   *
   * For reference, even though your Swagger (or OpenAPI) document has
   * defined `anyOf` instead of the `oneOf`, {@link OpenAiComposer} forcibly
   * converts it to `oneOf` type.
   */
  export interface IOneOf
    extends Omit<ILlmSchema.IOneOf, "oneOf">,
      ISwaggerSchemaCommonPlugin {
    /**
     * List of the union types.
     */
    oneOf: Exclude<IOpenAiSchema, IOpenAiSchema.IOneOf>[];
  }
}
