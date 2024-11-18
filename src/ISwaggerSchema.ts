import { OpenApi } from "@samchon/openapi";

import { ISwaggerSchemaCommonPlugin } from "./ISwaggerSchemaCommonPlugin";
import { ISwaggerSchemaPaymentPlugin } from "./ISwaggerSchemaPaymentPlugin";
import { ISwaggerSchemaSecurityPlugin } from "./ISwaggerSchemaSecurityPlugin";

/**
 * Type schema info.
 *
 * `ISwaggerSchema` is a type schema info of the OpenAPI v3.1 specification,
 * but a little shrinked and removed ambiguous and duplicated expressions of
 * OpenAPI v3.1 fopr the convenience and clarity.
 *
 * - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}
 * - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}
 * - Array type utilizes only single {@link OpenAPI.IJsonSchema.IArray.items}
 * - Tuple type utilizes only {@link OpenApi.IJsonSchema.ITuple.prefixItems}
 * - Merge {@link OpenApiV3_1.IJsonSchema.IAnyOf} to {@link OpenApi.IJsonSchema.IOneOf}
 * - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link OpenApi.IJsonSchema.IReference}
 * - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link OpenApi.IJsonSchema.IObject}
 *
 * Also, `ISwaggerSchema` extended some plugin properties for LLM
 * (Large Language Model, OpenAI) function calling purpose. Below is the list of
 * plugin properties newly added from {@link OpenApi.IJsonSchema} to `ISwaggerSchema`.
 *
 * - {@link ISwaggerSchema.IString.x-wrtn-secret-key}
 * - {@link ISwaggerSchema.IString.x-wrtn-secret-scopes}
 * - {@link ISwaggerSchemaCommonPlugin.x-wrtn-placeholder}
 * - {@link ISwaggerSchemaCommonPlugin.x-wrtn-prerequisite}
 *
 * @author Samchon
 */
export type ISwaggerSchema =
  | ISwaggerSchema.IConstant
  | ISwaggerSchema.IBoolean
  | ISwaggerSchema.IInteger
  | ISwaggerSchema.INumber
  | ISwaggerSchema.IString
  | ISwaggerSchema.IArray
  | ISwaggerSchema.ITuple
  | ISwaggerSchema.IObject
  | ISwaggerSchema.IReference
  | ISwaggerSchema.IOneOf
  | ISwaggerSchema.INull
  | ISwaggerSchema.IUnknown;
export namespace ISwaggerSchema {
  /**
   * Constant value type.
   */
  export interface IConstant
    extends OpenApi.IJsonSchema.IConstant,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Boolean type info.
   */
  export interface IBoolean
    extends OpenApi.IJsonSchema.IBoolean,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Integer type info.
   */
  export interface IInteger
    extends OpenApi.IJsonSchema.IInteger,
      ISwaggerSchemaCommonPlugin,
      ISwaggerSchemaPaymentPlugin.ITargetOrder,
      ISwaggerSchemaPaymentPlugin.IPriceAmount {}

  /**
   * Number (double) type info.
   */
  export interface INumber
    extends OpenApi.IJsonSchema.INumber,
      ISwaggerSchemaPaymentPlugin.ITargetOrder,
      ISwaggerSchemaPaymentPlugin.IPriceAmount {}

  /**
   * String type info.
   */
  export interface IString
    extends OpenApi.IJsonSchema.IString,
      ISwaggerSchemaCommonPlugin,
      ISwaggerSchemaPaymentPlugin.ITargetOrder,
      ISwaggerSchemaPaymentPlugin.IPriceCurrency,
      ISwaggerSchemaPaymentPlugin.IVendor,
      ISwaggerSchemaSecurityPlugin {}

  /**
   * Array type info.
   */
  export interface IArray
    extends OpenApi.IJsonSchema.IArray<ISwaggerSchema>,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Tuple type info.
   */
  export interface ITuple
    extends OpenApi.IJsonSchema.ITuple<ISwaggerSchema>,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Object type info.
   */
  export interface IObject
    extends OpenApi.IJsonSchema.IObject<ISwaggerSchema>,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Reference type directing named schema.
   */
  export interface IReference<Key = string>
    extends OpenApi.IJsonSchema.IReference<Key>,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Union type.
   *
   * IOneOf` represents an union type of the TypeScript (`A | B | C`).
   *
   * For reference, even though your Swagger (or OpenAPI) document has
   * defined `anyOf` instead of the `oneOf`, {@link OpenApi} forcibly
   * converts it to `oneOf` type.
   */
  export interface IOneOf
    extends Omit<OpenApi.IJsonSchema.IOneOf, "oneOf">,
      ISwaggerSchemaCommonPlugin {
    /**
     * List of the union types.
     */
    oneOf: Exclude<ISwaggerSchema, ISwaggerSchema.IOneOf>[];
  }

  /**
   * Null type.
   */
  export interface INull
    extends OpenApi.IJsonSchema.INull,
      ISwaggerSchemaCommonPlugin {}

  /**
   * Unknown, `any` type.
   */
  export interface IUnknown
    extends OpenApi.IJsonSchema.IUnknown,
      ISwaggerSchemaCommonPlugin {}
}
