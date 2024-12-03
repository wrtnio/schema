import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import { HttpOpenAi, IHttpOpenAiApplication } from "@wrtnio/schema";

import swagger from "../swagger.json";

export const test_http_llm_function_multipart = (): void => {
  const document: OpenApi.IDocument = OpenApi.convert(swagger as any);
  const application: IHttpOpenAiApplication = HttpOpenAi.application({
    document,
    options: {
      keyword: true,
    },
  });
  TestValidator.equals("multipart not suppported")(
    !!application.errors.find(
      (e) =>
        e.method === "post" &&
        e.path === "/{index}/{level}/{optimal}/multipart",
    ),
  )(true);
};
