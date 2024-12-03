import { TestValidator } from "@nestia/e2e";
import { IHttpConnection, IHttpResponse, OpenApi } from "@samchon/openapi";
import {
  HttpOpenAi,
  IHttpOpenAiApplication,
  IHttpOpenAiFunction,
  OpenAiTypeChecker,
} from "@wrtnio/schema";

import swagger from "../swagger.json";

export const test_http_llm_fetcher_keyword_query = async (
  connection: IHttpConnection,
): Promise<void> => {
  const document: OpenApi.IDocument = OpenApi.convert(swagger as any);
  const application: IHttpOpenAiApplication = HttpOpenAi.application({
    document,
    options: {
      keyword: true,
      separate: (schema) =>
        OpenAiTypeChecker.isString(schema) && !!schema.contentMediaType,
    },
  });
  const func: IHttpOpenAiFunction | undefined = application.functions.find(
    (f) => f.path === "/{index}/{level}/{optimal}/query" && f.method === "get",
  );
  if (func === undefined) throw new Error("Function not found");

  const response: IHttpResponse = await HttpOpenAi.propagate({
    connection,
    application,
    function: func,
    arguments: HttpOpenAi.mergeParameters({
      function: func,
      llm: [
        {
          level: 123,
          optimal: true,
          query: {
            summary: "some summary",
          },
        },
      ],
      human: [
        {
          index: "https://some.url/index.html",
          query: {
            thumbnail: "https://some.url/file.jpg",
          },
        },
      ],
    }),
  });
  TestValidator.equals("response.status")(response.status)(200);
};
