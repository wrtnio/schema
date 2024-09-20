# `@wrtnio/schema`
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wrtnio/schema/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@wrtnio/schema.svg)](https://www.npmjs.com/package/@wrtnio/schema)
[![Downloads](https://img.shields.io/npm/dm/@wrtnio/schema.svg)](https://www.npmjs.com/package/@wrtnio/schema)
[![Build Status](https://github.com/wrtnio/schema/workflows/build/badge.svg)](https://github.com/wrtnio/schema/actions?query=workflow%3Abuild)

Extension of [`@samchon/openapi`](https://github.com/samchon/openapi) adding plugin properties.

`@wrtnio/schema` is a collection of Swagger (OpenAPI) and OpenAI (LLM, Large Language Model) function calling schemas that is extended from `@samchon/openapi` library adding some plugin properties like `x-wrtn-secret-key`, especially for the Wrtn Studio Pro.

  - Wrtn Studio Pro Application: https://studio-pro.wrtn.ai
  - Wrtn Studio Pro Documents: https://wrtn.ai/studio-pro/

Here is the list of extended types from the `@samchon/openapi`, and you can use these `@wrtnio/schema` types just by combining with the `@samchon/openapi` provided functions like below. Note that, every types defined in the `@wrtnio/schema` are compatible with `@samchon/openapi`.

```typescript
import { HttpLlm, OpenApi } from "@samchon/openapi";
import { IHttpOpenAiApplication, ISwagger } from "@wrtnio/schema";

const document: ISwagger = OpenApi.convert(YOUR_SWAGGER_DOCUMENT);
const application: IHttpOpenAiApplication = HttpLlm.application(document);
```

Kind                                                                                       | `@wrtnio/schema`             | `@samchon/openapi`
-------------------------------------------------------------------------------------------|------------------------------|---------------------------
[**HTTP LLM Application**](https://wrtn.ai/studio-pro/tech-specs/meta/schema/#application) | **`IHttpOpenAiApplication`** | **`IHttpLlmApplication`**
[HTTP LLM Function Schema](https://wrtn.ai/studio-pro/tech-specs/meta/schema/#function)    | `IHttpOpenAiFunction`        | `IHttpLlmFunction`
[LLM Type Schema](https://wrtn.ai/studio-pro/tech-specs/meta/schema/#schema)               | `IOpenAiSchema`              | `ILlmSchema`
[LLM Function Schema](https://typia.io/docs/llm/application/)                              | `IOpenAiFunction`            | `ILlmFunction`
[LLM Application](https://typia.io/docs/llm/application/)                                  | `IOpenAiApplication`         | `ILlmApplication`
[**OpenAPI Document**](https://wrtn.ai/studio-pro/tech-specs/openapi/document/#document)   | **`ISwagger`**               | **`OpenApi.IDocument`**
[Server URL Address](https://wrtn.ai/studio-pro/tech-specs/openapi/document/#server)       | `ISwaggerServer`             | `OpenApi.IServer`
[API Operation](https://wrtn.ai/studio-pro/tech-specs/openapi/document/#operation)         | `ISwaggerOperation`          | `OpenApi.IOperation`
[JSON Schema](https://wrtn.ai/studio-pro/tech-specs/openapi/json/)                         | `ISwaggerSchema`             | `OpenApi.IJsonSchema`
[Security Scheme](https://wrtn.ai/studio-pro/tech-specs/openapi/document/#security-scheme) | `ISwaggerSecuritySchema`     | `OpenApi.ISecurityScheme`
[Schema Components](https://wrtn.ai/studio-pro/tech-specs/openapi/json/#components)        | `ISwaggerComponents`         | `OpenApi.IComponents`




## Plugin Properties
Plugin properties starting with `x-wrtn-` in type schemas. 

Only the difference between `@wrtnio/schema` and `@samchon/openapi` is, `@wrtnio/schema` is filling JSON and LLM function calling type schemas with plugin properties which are starting from the `x-wrtn-` prefix key name. 

At first, `x-wrtn-placeholder` and `x-wrtn-prerequisite` properties are defined in the every type schemas. The `x-wrtn-placeholder` means the placeholder text in the UI input component as literally, and `x-wrtn-prerequisite` directs the pre-requisite API operation endpoint to compose the target value with JMesPath expression.

  - every types in the `ISwaggerSchema`
  - every types in the `IOpenAiSchema`

```typescript
// adjusted to every JSON and LLM type schemas
export interface ISwaggerSchemaPlugin {
  /**
   * Placeholder value for frontend application.
   *
   * Placeholder means the value to be shown in the input field as a hint.
   * For example, when an email input field exists, the placeholder value
   * would be "Insert your email address here".
   */
  "x-wrtn-placeholder"?: string;

  /**
   * Prerequisite API endpoint for the schema.
   *
   * `x-wrtn-prerequisite` is a property representing the prerequisite API
   * interaction. It means that, the endpoint API should be called before
   * calling the target API, for composing some argument value.
   *
   * @reference https://github.com/wrtnio/decorators/blob/main/src/Prerequisite.ts
   */
  "x-wrtn-prerequisite"?: ISwaggerSchemaPlugin.IPrerequisite;
}
export namespace ISwaggerSchemaPlugin {
  export interface IPrerequisite {
    /**
     * HTTP method to call the endpoint.
     */
    method: "get" | "post" | "patch" | "put" | "delete";

    /**
     * Path of the endpoint.
     */
    path: string;

    /**
     * Function returning transformed values using JMESPath expression.
     *
     * `Prerequisite.Props.jmesPath` is a string typed property that extracts desired values
     * from the prerequisite API response using a JMESPath expression. This property simplifies
     * and replaces the `label`, `value`, and `array` properties.
     *
     * JMESPath expressions are used to extract the desired data based on the API response.
     * The expression must always be a valid JMESPath syntax.
     *
     * - Type: `jmesPath: string`
     * - Example: `"members[*].data.title"`
     * - Usage: `jmespath.search(response, jmesPath)`
     *
     * Note: The `label`, `value`, and `array` properties are no longer in use.
     */
    jmesPath: string;
  }
}
```

Also, the `string` typed schema has two additional properties about secret identification.

  - `ISwaggerSchema.IString`
  - `IOpenAiSchema.IString`

The first property `x-wrtn-secret-key` means secret key of a specific service, and the second property `x-wrtn-secret-scopes` means a list of secret scopes that are required for the target API endpoint calling.

```typescript
export namespace ISwaggerSchema {
  /**
   * String type info.
   */
  export interface IString
    extends OpenApi.IJsonSchema.IString,
      ISwaggerSchemaPlugin {
    /**
     * Secret key for the schema.
     *
     * `x-wrtn-secret-key` is a property means a secret key that is required
     * for the target API endpoint calling. If the secret key is not filled,
     * the API call would be failed.
     */
    "x-wrtn-secret-key"?: string;
 
    /**
     * Secret scopes for the schema.
     *
     * `x-wrtn-secret-scopes` is a property means a list of secret scopes that
     * are required for the target API endpoint calling. If the secret scopes
     * are not satisfied, the API call would be failed.
     */
    "x-wrtn-secret-scopes"?: string[];
  }
}
```