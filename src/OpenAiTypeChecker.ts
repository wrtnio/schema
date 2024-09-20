import { LlmTypeChecker } from "@samchon/openapi";

import { IOpenAiSchema } from "./IOpenAiSchema";

/**
 * Type checker for OpenAI function call schema.
 *
 * `OpenAiTypeChecker` is a type checker of {@link IOpenAiSchema}.
 *
 * @author Samchon
 */
export namespace OpenAiTypeChecker {
  /**
   * Visit every nested schemas.
   *
   * Visit every nested schemas of the target, and apply the callback function
   * to them.
   *
   * If the visitor meets an union type, it will visit every individual schemas
   * in the union type. Otherwise meets an object type, it will visit every
   * properties and additional properties. If the visitor meets an array type,
   * it will visit the item type.
   *
   * @param schema Target schema to visit
   * @param callback Callback function to apply
   */
  export const visit = (
    schema: IOpenAiSchema,
    callback: (schema: IOpenAiSchema) => void,
  ): void => LlmTypeChecker.visit(schema, callback);

  /**
   * Test whether the schema is an union type.
   *
   * @param schema Target schema
   * @returns Whether union type or not
   */
  export const isOneOf = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.IOneOf => LlmTypeChecker.isOneOf(schema);

  /**
   * Test whether the schema is an object type.
   *
   * @param schema Target schema
   * @returns Whether object type or not
   */
  export const isObject = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.IObject => LlmTypeChecker.isObject(schema);

  /**
   * Test whether the schema is an array type.
   *
   * @param schema Target schema
   * @returns Whether array type or not
   */
  export const isArray = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.IArray => LlmTypeChecker.isArray(schema);

  /**
   * Test whether the schema is a boolean type.
   *
   * @param schema Target schema
   * @returns Whether boolean type or not
   */
  export const isBoolean = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.IBoolean => LlmTypeChecker.isBoolean(schema);

  /**
   * Test whether the schema is a number type.
   *
   * @param schema Target schema
   * @returns Whether number type or not
   */
  export const isNumber = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.INumber => LlmTypeChecker.isNumber(schema);

  /**
   * Test whether the schema is a string type.
   *
   * @param schema Target schema
   * @returns Whether string type or not
   */
  export const isString = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.IString => LlmTypeChecker.isString(schema);

  /**
   * Test whether the schema is a null type.
   *
   * @param schema Target schema
   * @returns Whether null type or not
   */
  export const isNullOnly = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.INullOnly => LlmTypeChecker.isNullOnly(schema);

  /**
   * Test whether the schema is a nullable type.
   *
   * @param schema Target schema
   * @returns Whether nullable type or not
   */
  export const isNullable = (schema: IOpenAiSchema): boolean =>
    LlmTypeChecker.isNullable(schema);

  /**
   * Test whether the schema is an unknown type.
   *
   * @param schema Target schema
   * @returns Whether unknown type or not
   */
  export const isUnknown = (
    schema: IOpenAiSchema,
  ): schema is IOpenAiSchema.IUnknown => LlmTypeChecker.isUnknown(schema);
}
