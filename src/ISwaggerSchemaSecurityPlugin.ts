/**
 * Plugin properties about the security.
 *
 * @author Samchon
 */
export interface ISwaggerSchemaSecurityPlugin {
  /**
   * Secret key for the schema.
   *
   * `x-wrtn-secret-key` is a property means a secret key that is required
   * for the target API endpoint calling. If the secret key is not filled,
   * the API call would be failed.
   */
  "x-wrtn-secret-key"?: string;

  /**
   * Secret scopes for the schema.
   *
   * `x-wrtn-secret-scopes` is a property means a list of secret scopes that
   * are required for the target API endpoint calling. If the secret scopes
   * are not satisfied, the API call would be failed.
   */
  "x-wrtn-secret-scopes"?: string[];
}
