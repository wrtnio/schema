import { TestValidator } from "@nestia/e2e";
import { OpenApi } from "@samchon/openapi";
import { HttpOpenAi, OpenAiTypeChecker } from "@wrtnio/schema";
import typia from "typia";

export const test_http_llm_separate_parameters = async (): Promise<void> => {
  const document: OpenApi.IDocument = typia.assert<OpenApi.IDocument>(
    await fetch(
      "https://wrtnio.github.io/connectors/swagger/swagger.json",
    ).then((r) => r.json()),
  );
  for (const path of Object.keys(document.paths ?? {}))
    if (path !== "/connector/notion/database-item/{databaseId}")
      delete document.paths?.[path];

  const app = HttpOpenAi.application({
    document,
    options: {
      separate: (schema) =>
        OpenAiTypeChecker.isString(schema) &&
        schema["x-wrtn-secret-key"] !== undefined,
    },
  });
  const func = app.functions.find(
    (f) =>
      f.method === "post" &&
      f.path === "/connector/notion/database-item/{databaseId}",
  );
  if (func === undefined) throw new Error("Function not found");
  TestValidator.equals("human")(func.separated?.human.at(0)?.index)(1);
};
