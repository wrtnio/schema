import { TestValidator } from "@nestia/e2e";
import { IHttpConnection, IHttpResponse, OpenApi } from "@samchon/openapi";
import {
  HttpOpenAi,
  IHttpOpenAiApplication,
  IHttpOpenAiFunction,
  OpenAiTypeChecker,
} from "@wrtnio/schema";

import swagger from "../swagger.json";

export const test_http_llm_fetcher_keyword_query_and_body = async (
  connection: IHttpConnection,
): Promise<void> => {
  const document: OpenApi.IDocument = OpenApi.convert(swagger as any);
  const application: IHttpOpenAiApplication = HttpOpenAi.application({
    document,
    options: {
      keyword: false,
      separate: (schema) =>
        OpenAiTypeChecker.isString(schema) && !!schema.contentMediaType,
    },
  });
  const func: IHttpOpenAiFunction | undefined = application.functions.find(
    (f) =>
      f.path === "/{index}/{level}/{optimal}/query/body" && f.method === "post",
  );
  if (func === undefined) throw new Error("Function not found");

  const response: IHttpResponse = await HttpOpenAi.propagate({
    connection,
    application,
    function: func,
    arguments: HttpOpenAi.mergeParameters({
      function: func,
      llm: [
        123,
        true,
        {
          summary: "some summary",
        },
        {
          title: "some title",
          body: "some body",
          draft: false,
        },
      ],
      human: [
        "https://some.url/index.html",
        {
          thumbnail: "https://some.url/file.jpg",
        },
      ],
    }),
  });
  TestValidator.equals("response.status")(response.status)(201);
};
