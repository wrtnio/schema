import { IHttpMigrateApplication } from "@samchon/openapi";

import { ISwaggerOperation } from "./ISwaggerOperation";
import { ISwaggerSchema } from "./ISwaggerSchema";

/**
 * Document of migration.
 *
 * The `ISwaggerMigrateApplication` interface is an application migrated
 * from {@link ISwagger OpenAPI document} to RPC (Remote Procedure Call)
 * functions; {@link ISwaggerMigrateRoute}.
 *
 * As the `ISwaggerMigrate` and {@link ISwaggerMigrateRoute} have a lot of
 * special stories, when you're developing OpenAPI generator library, please
 * read their descriptions carefully including the description of properties.
 *
 * @author Samchon
 */
export type ISwaggerMigrateApplication = IHttpMigrateApplication<
  ISwaggerSchema,
  ISwaggerOperation
>;
export namespace ISwaggerMigrateApplication {
  /**
   * Error of migration in the operation level.
   */
  export type IError = IHttpMigrateApplication.IError<ISwaggerSchema>;
}
