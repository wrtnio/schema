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

  export namespace IChatGptSchema {
    export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface IString
      extends ISwaggerSchemaPaymentPlugin.IString,
        ISwaggerSchemaSecurityPlugin {}
    export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
  }

  export namespace IClaudeSchema {
    export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface IString
      extends ISwaggerSchemaPaymentPlugin.IString,
        ISwaggerSchemaSecurityPlugin {}
    export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
  }

  export namespace IGeminiSchema {
    export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface IString
      extends ISwaggerSchemaPaymentPlugin.IString,
        ISwaggerSchemaSecurityPlugin {}
    export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
  }

  export namespace ILlamaSchema {
    export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface IString
      extends ISwaggerSchemaPaymentPlugin.IString,
        ISwaggerSchemaSecurityPlugin {}
    export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
  }

  export namespace ILlmSchemaV3 {
    export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface IString
      extends ISwaggerSchemaPaymentPlugin.IString,
        ISwaggerSchemaSecurityPlugin {}
    export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
  }

  export namespace ILlmSchemaV3_1 {
    export interface IInteger extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface INumber extends ISwaggerSchemaPaymentPlugin.INumeric {}
    export interface IString
      extends ISwaggerSchemaPaymentPlugin.IString,
        ISwaggerSchemaSecurityPlugin {}
    export interface __IAttribute extends ISwaggerSchemaCommonPlugin {}
  }
}
