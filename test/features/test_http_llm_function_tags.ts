import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import {
  HttpOpenAi,
  IHttpOpenAiApplication,
  IHttpOpenAiFunction,
} from "@wrtnio/schema";

import swagger from "../swagger.json";

export const test_http_llm_function_deprecated = (): void => {
  const document: OpenApi.IDocument = OpenApi.convert(swagger as any);
  const application: IHttpOpenAiApplication = HttpOpenAi.application({
    document,
    options: {
      keyword: true,
    },
  });
  const func: IHttpOpenAiFunction | undefined = application.functions.find(
    (f) => f.method === "post" && f.path === "/{index}/{level}/{optimal}/body",
  );
  TestValidator.equals("tags")(func?.tags)(["body", "post"]);
};
