import { TestValidator } from "@nestia/e2e";
import { IHttpMigrateRoute, OpenApi } from "@samchon/openapi";
import { HttpOpenAi, IHttpOpenAiApplication } from "@wrtnio/schema";

import swagger from "../swagger.json";

export const test_http_llm_application_positional = (): void => {
  const document: OpenApi.IDocument = OpenApi.convert(swagger as any);
  const application: IHttpOpenAiApplication = HttpOpenAi.application({
    document,
    options: {
      keyword: false,
    },
  });
  for (const func of application.functions) {
    const route: IHttpMigrateRoute = func.route();
    TestValidator.equals("length")(func.parameters.length)(
      route.parameters.length + (route.query ? 1 : 0) + (route.body ? 1 : 0),
    );
  }
};
