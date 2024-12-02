import { ILlmSchemaV3 } from "@samchon/openapi";

import { ISwaggerSchemaCommonPlugin } from "./ISwaggerSchemaCommonPlugin";
import { ISwaggerSchemaPaymentPlugin } from "./ISwaggerSchemaPaymentPlugin";
import { ISwaggerSchemaSecurityPlugin } from "./ISwaggerSchemaSecurityPlugin";

export import IOpenAiSchema = ILlmSchemaV3;

declare module "@samchon/openapi" {
  export namespace ILlmSchemaV3 {
    export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface IString
      extends ISwaggerSchemaPaymentPlugin.IString,
        ISwaggerSchemaSecurityPlugin {}
    export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
  }
}
