import { TestValidator } from "@nestia/e2e";
import { IHttpConnection, IHttpResponse, OpenApi } from "@samchon/openapi";
import {
  HttpOpenAi,
  IHttpOpenAiApplication,
  IHttpOpenAiFunction,
  OpenAiTypeChecker,
} from "@wrtnio/schema";

import swagger from "../swagger.json";

export const test_http_llm_fetcher_keyword_body = async (
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
    (f) => f.path === "/{index}/{level}/{optimal}/body" && f.method === "post",
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
          body: {
            title: "some title",
            body: "some body",
            draft: false,
          },
        },
      ],
      human: [
        {
          index: "https://some.url/index.html",
        },
      ],
    }),
  });
  TestValidator.equals("response.status")(response.status)(201);
};
