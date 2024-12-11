import { TestValidator } from "@nestia/e2e";
import { IHttpOpenAiFunction, IOpenAiSchema } from "@wrtnio/schema";
import { LlmDataMerger } from "@wrtnio/schema/lib/internal/HttpOpenAiMerger";

export const test_http_llm_merge_parameters = (): void => {
  const p = LlmDataMerger.parameters({
    function: {
      parameters: [
        {
          type: "array",
          items: {},
        },
      ] satisfies IOpenAiSchema[],
      separated: {
        human: [
          {
            index: 0,
            schema: {
              type: "array",
              items: {},
            },
          },
        ],
        llm: [
          {
            index: 0,
            schema: {
              type: "array",
              items: {},
            },
          },
        ],
      } satisfies IHttpOpenAiFunction.ISeparated,
    } as IHttpOpenAiFunction,
    llm: [],
    human: [
      {
        a: 1,
      },
    ],
  });
  TestValidator.equals(p as any)([
    {
      a: 1,
    },
  ]);
};
