import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import {
  HttpOpenAi,
  IHttpOpenAiApplication,
  IHttpOpenAiFunction,
  OpenAiTypeChecker,
} from "@wrtnio/schema";

export const test_http_llm_separate_parameters_of_empty = (): void => {
  const document: OpenApi.IDocument = {
    openapi: "3.1.0",
    "x-samchon-emended": true,
    components: {},
    paths: {
      "/": {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  required: [],
                },
              },
            },
          },
        },
      },
    },
  };
  const app: IHttpOpenAiApplication = HttpOpenAi.application({
    document,
    options: {
      separate: (schema) =>
        OpenAiTypeChecker.isString(schema) &&
        schema["x-wrtn-secret-key"] !== undefined,
    },
  });
  const func: IHttpOpenAiFunction = app.functions[0];
  TestValidator.equals("separated")(func.separated)({
    llm: [
      {
        schema: {
          type: "object",
          properties: {},
          required: [],
          additionalProperties: false,
        },
        index: 0,
      },
    ],
    human: [],
  });
};
