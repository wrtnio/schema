import { TestValidator } from "@nestia/e2e";
import { IHttpMigrateRoute, OpenApi } from "@samchon/openapi";
import {
  HttpOpenAi,
  IHttpOpenAiApplication,
  IOpenAiSchema,
  OpenAiTypeChecker,
} from "@wrtnio/schema";

import swagger from "../swagger.json";

export const test_http_llm_application_keyword = (): void => {
  const document: OpenApi.IDocument = OpenApi.convert(swagger as any);
  const application: IHttpOpenAiApplication = HttpOpenAi.application({
    document,
    options: {
      keyword: true,
    },
  });
  for (const func of application.functions) {
    const route: IHttpMigrateRoute = func.route();
    TestValidator.equals("length")(1)(func.parameters.length);
    TestValidator.equals("properties")([
      ...route.parameters.map((p) => p.key),
      ...(route.query ? ["query"] : []),
      ...(route.body ? ["body"] : []),
    ])(
      (() => {
        const schema: IOpenAiSchema = func.parameters[0];
        if (!OpenAiTypeChecker.isObject(schema)) return [];
        return Object.keys(schema.properties ?? {});
      })(),
    );
  }
};
