import { OpenApi } from "@samchon/openapi";

import { ISwaggerSchemaCommonPlugin } from "./ISwaggerSchemaCommonPlugin";
import { ISwaggerSchemaPaymentPlugin } from "./ISwaggerSchemaPaymentPlugin";
import { ISwaggerSchemaSecurityPlugin } from "./ISwaggerSchemaSecurityPlugin";

export import ISwaggerSchema = OpenApi.IJsonSchema;

declare module "@samchon/openapi" {
  export namespace OpenApi {
    export namespace IJsonSchema {
      export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
      export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
      export interface IString
        extends ISwaggerSchemaPaymentPlugin.IString,
          ISwaggerSchemaSecurityPlugin {}
      export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
    }
  }
}
