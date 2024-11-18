/**
 * Plugin properties for every types.
 *
 * @author Samchon
 */
export interface ISwaggerSchemaCommonPlugin {
  /**
   * Placeholder value for frontend application.
   *
   * Placeholder means the value to be shown in the input field as a hint.
   * For example, when an email input field exists, the placeholder value
   * would be "Insert your email address here".
   */
  "x-wrtn-placeholder"?: string;

  /**
   * Prerequisite API endpoint for the schema.
   *
   * `x-wrtn-prerequisite` is a property representing the prerequisite API
   * interaction. It means that, the endpoint API should be called before
   * calling the target API, for composing some argument value.
   *
   * @reference https://github.com/wrtnio/decorators/blob/main/src/Prerequisite.ts
   */
  "x-wrtn-prerequisite"?: ISwaggerSchemaCommonPlugin.IPrerequisite;
}
export namespace ISwaggerSchemaCommonPlugin {
  /**
   * Prerequisite API endpoint with accessors.
   */
  export type IPrerequisite = IPrerequisiteOfJMesPath | IPrerequisiteOfFunction;

  /**
   * Prerequisite by JMESPath expression.
   */
  interface IPrerequisiteOfJMesPath extends IPrerequisiteBase {
    /**
     * Function returning transformed values using JMESPath expression.
     *
     * `Prerequisite.Props.jmesPath` is a string typed property that extracts desired values
     * from the prerequisite API response using a JMESPath expression. This property simplifies
     * and replaces the `label`, `value`, and `array` properties.
     *
     * JMESPath expressions are used to extract the desired data based on the API response.
     * The expression must always be a valid JMESPath syntax.
     *
     * - Type: `jmesPath: string`
     * - Example: `"members[*].data.title"`
     * - Usage: `jmespath.search(response, jmesPath)`
     *
     * Note: The `label`, `value`, and `array` properties are no longer in use.
     */
    jmesPath: string;
  }

  /**
   * Prerequisite by JS function.
   *
   * @deprecated
   */
  interface IPrerequisiteOfFunction extends IPrerequisiteBase {
    /**
     * Transform function returning label.
     *
     * `Prerequisite.Props.label` is a string typed property representing
     * a function returning the label from the element instance of the
     * prerequisite API respond array.
     *
     * The function script must be a string value that can be parsed by
     * `new Function(string)` statement. Also, its parameter names are
     * always `elem`, `index` and `array`. Of course, the function's
     * return type must be always `string`.
     *
     * - type: `label: (elem: Element, index: number, array: Element[]) => string`
     * - example: `return elem.title`
     * - how to use: `new Function("elem", "index", "array", labelScript)(...)`
     */
    label: string;

    /**
     * Transform function returning target value.
     *
     * `Prerequisite.Props.value` is a string typed property representing
     * a function returning the target value from the element instance of
     * the prerequisite API respond array. If you've defined this `Prerequisite`
     * type to a `number` type, the returned value must be actual number type.
     *
     * The function script must be a string value that can be parsed by
     * `new Function(string)` statement. Also, its parameter names are always
     * `elem`, `index` and `array`.
     *
     * - type: `value: (elem: Element, index: number, array: Element[]) => Value`
     * - example: `return elem.no`
     * - how to use: `new Function("elem", "index", "array", valueScript)(...)`
     */
    value: string;

    /**
     * Transform function returning array instance.
     *
     * `Prerequisite.Props.array` is a string typed property representing
     * a function returning an array instance from the response of the
     * prerequisite API.
     *
     * The function script must be a string value that can be parsed by
     * `new Function(string)` statement. Also, its parameter name is
     * always `response`.
     *
     * If the prerequisite API responses an array and it is the desired one,
     * you don't need to specify this property.
     *
     * - type: `array: (response: Response) => Elemenet[]`
     * - example: `return response.members.map(m => m.data)`
     * - how to use: `new Function("response", arrayScript)(response)`
     */
    array?: string;
  }

  interface IPrerequisiteBase {
    /**
     * HTTP method to call the endpoint.
     */
    method: "get" | "post" | "patch" | "put" | "delete";

    /**
     * Path of the endpoint.
     */
    path: string;
  }
}
