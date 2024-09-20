import { IHttpMigrateRoute } from "@samchon/openapi";

import { ISwaggerOperation } from "./ISwaggerOperation";
import { ISwaggerSchema } from "./ISwaggerSchema";

/**
 * Route information for migration.
 *
 * The `ISwaggerMigrateRoute` is a structure representing a route information
 * for OpenAPI generated RPC (Remote Procedure Call) function composed from the
 * {@link ISwaggerOperation OpenAPI operation}.
 *
 * As the `ISwaggerMigrateRoute` has a lot of speical stories, when you're
 * developing OpenAPI generator library, please read its description carefully
 * including the description of its properties.
 *
 * @author Samchon
 */
export type ISwaggerMigrateRoute = IHttpMigrateRoute<
  ISwaggerSchema,
  ISwaggerOperation
>;
export namespace ISwaggerMigrateRoute {
  /**
   * Metadata of path parameter.
   */
  export type IParameter = IHttpMigrateRoute.IParameter<ISwaggerSchema>;

  /**
   * Metadata of headers.
   */
  export type IHeaders = IHttpMigrateRoute.IHeaders<ISwaggerSchema>;

  /**
   * Metadata of query values.
   */
  export type IQuery = IHttpMigrateRoute.IQuery<ISwaggerSchema>;

  /**
   * Metadata of request/response body.
   */
  export type IBody = IHttpMigrateRoute.IBody<ISwaggerSchema>;

  /**
   * Metadata of response body for exceptional status cases.
   */
  export type IException = IHttpMigrateRoute.IException<ISwaggerSchema>;
}
