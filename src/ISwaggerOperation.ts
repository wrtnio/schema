import { OpenApi } from "@samchon/openapi";
import { tags } from "typia";

import "./ISwaggerSchema";

export import ISwaggerOperation = OpenApi.IOperation;

declare module "@samchon/openapi" {
  export namespace OpenApi {
    export interface IOperation {
      /**
       * Icon URL.
       *
       * `x-wrtn-icon` is a property means an icon URL representing the target API.
       */
      "x-wrtn-icon"?: string & tags.Format<"uri">;

      /**
       * Whether standalone API or not.
       *
       * `x-wrtn-standalone` is a property means whether the target API is standalone
       * so that it can be called without any other APIs or not.
       */
      "x-wrtn-standalone"?: boolean;

      /**
       * Whether experimental or not.
       *
       * `x-wrtn-experimental` is a property means whether the target API is experimental
       * so that it can be revealed in the production environment or not. In other words,
       * if the property is `true`, the API is only available in the development environment.
       */
      "x-wrtn-experimental"?: boolean;
    }
  }
}
