import {
  HttpMigration,
  IHttpMigrateRoute,
  IHttpResponse,
} from "@samchon/openapi";
import { HttpMigrateRouteFetcher } from "@samchon/openapi/lib/http/HttpMigrateRouteFetcher";

import { HttpOpenAi } from "../HttpOpenAi";

export namespace HttpOpenAiFetcher {
  export const execute = async (
    props: HttpOpenAi.IFetchProps,
  ): Promise<unknown> =>
    HttpMigrateRouteFetcher.execute(getFetchArguments(props));

  export const propagate = async (
    props: HttpOpenAi.IFetchProps,
  ): Promise<IHttpResponse> =>
    HttpMigrateRouteFetcher.propagate(getFetchArguments(props));

  const getFetchArguments = (
    props: HttpOpenAi.IFetchProps,
  ): HttpMigration.IFetchProps => {
    const route: IHttpMigrateRoute = props.function.route();
    const parameters: Array<unknown> = props.arguments.slice(
      0,
      route.parameters.length,
    );
    const query: unknown | undefined = route.query
      ? props.arguments[route.parameters.length]
      : undefined;
    const body: unknown | undefined = route.body
      ? props.arguments[route.parameters.length + (route.query ? 1 : 0)]
      : undefined;
    return {
      connection: props.connection,
      route,
      parameters: parameters as Array<
        string | number | boolean | bigint | null
      >,
      query: query as object,
      body: body as object,
    };
  };
}
