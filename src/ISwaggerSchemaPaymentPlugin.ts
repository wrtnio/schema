/**
 * Collection of payment plugins.
 *
 * @author Samchon
 */
export namespace ISwaggerSchemaPaymentPlugin {
  /**
   * Plugin properties for `integer` and `number` types.
   */
  export interface INumeric {
    /**
     * The payment target.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-target` property, the value means the identifier
     * of the payment target, as an order.
     *
     * When processing the publish, you have to fill the next payment
     * function's parameter with the target order's ID. Note that, this
     * `x-wrtn-payment-order-id` is different with the
     * {@link IVendor.x-wrtn-payment-uid}, which means the transation ID
     * issued by the payment vendor service. In other words,
     * `x-wrtn-payment-order-id` is issued by the target API function.
     */
    "x-wrtn-payment-order-id"?: true;

    /**
     * The citizen ID who've ordered the payment.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-citizen-id` property, the value means the citizen
     * ID who've ordered the payment.
     *
     * When processing the publish, you have to fill the next payment
     * function's parameter with the citizen ID who've ordered the payment.
     */
    "x-wrtn-payment-citizen-id"?: true;

    /**
     * The amount of the payment should be paid.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-amount` property, the value means the amount of the
     * payment should be paid at the next publishing plan.
     *
     * The payment would be proceeded by the payment vendor service, and you
     * may fill the next payment function's parameter with the vendor service
     * code and UID of the payment transaction that is signified by the
     * `x-wrtn-payment-vendor` and `x-wrtn-payment-uid` typed properties.
     */
    "x-wrtn-payment-amount"?: true;
  }

  /**
   * Plugin properties for the `string` type.
   */
  export interface IString {
    /**
     * The currency of the payment should be paid.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-currency` property, the value means the currency of the
     * payment should be paid at the next publishing plan.
     *
     * The payment would be proceeded by the payment vendor service, and you
     * may fill the next payment function's parameter with the vendor service
     * code and UID of the payment transaction that is signified by the
     * `x-wrtn-payment-vendor` and `x-wrtn-payment-uid` typed properties.
     */
    "x-wrtn-payment-currency"?: true;

    /**
     * Code of the payment vendor service.
     *
     * When a payment function is called, its parameters may contain the
     * code of the payment vendor service that is represented by the
     * `x-wrtn-payment-vendor` typed property.
     *
     * If the target payment function's vendor service is "stripe", just fill
     * the `x-wrtn-payment-vendor` property with the string "stripe".
     * Otherwise, the vendor service code is "toss-payments", just fill the
     * `x-wrtn-payment-vendor` typed property with the string "toss-payments".
     *
     * The `x-wrtn-payment-vendor` property is used to identify the payment
     * vendor service and to check the payment status with the
     * {@link x-wrtn-payment-uid} typed property.
     */
    "x-wrtn-payment-vendor"?: true;

    /**
     * UID of the payment transaction.
     *
     * When a payment function is called, its parameters may contain the
     * UID of the payment transaction that is signified by the
     * `x-wrtn-payment-uid` typed property.
     *
     * The UID is a unique identifier of the payment transaction that is
     * proceeded by the payment vendor service. The UID is used to identify
     * the payment transaction and to check the payment status with the
     * {@link x-wrtn-payment-vendor} typed property.
     */
    "x-wrtn-payment-uid"?: true;

    /**
     * The payment target's order ID.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-target` property, the value means the identifier
     * of the payment target, as an order.
     *
     * When processing the publish, you have to fill the next payment
     * function's parameter with the target order's ID. Note that, this
     * `x-wrtn-payment-order-id` is different with the
     * {@link IVendor.x-wrtn-payment-uid}, which means the transation ID
     * issued by the payment vendor service. In other words,
     * `x-wrtn-payment-order-id` is issued by the target API function.
     */
    "x-wrtn-payment-order-id"?: true;

    /**
     * The payment target's order name.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-order-name` property, the value means the name of the
     * payment target, as an order.
     *
     * When processing the publish, you have to fill the next payment
     * function's parameter with the target order's name.
     *
     * Note that, this `x-wrtn-payment-order-name` is different with the
     * {@link IVendor.x-wrtn-payment-citizen-name}. This is not the name
     * or citizen, but of the target order.
     */
    "x-wrtn-payment-order-name"?: true;

    /**
     * The citizen ID who've ordered the payment.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-citizen-id` property, the value means the citizen
     * ID who've ordered the payment.
     *
     * When processing the publish, you have to fill the next payment
     * function's parameter with the citizen ID who've ordered the payment.
     */
    "x-wrtn-payment-citizen-id"?: true;

    /**
     * The citizen name who've ordered the payment.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-citizen-name` property, the value means the citizen
     * name who've ordered the payment.
     *
     * When processing the publish, you have to fill the next payment
     * function's parameter with the citizen name who've ordered the payment.
     */
    "x-wrtn-payment-citizen-name"?: true;

    /**
     * The mobile phone number of the citizen who've ordered the payment.
     *
     * If an order appliance function be called and it returns a value with
     * `x-wrtn-payment-citizen-mobile` property, the value means the mobile
     * phone number of the citizen who've ordered the payment.
     *
     * When processing the publish, you have to fill the next payment
     * function's parameter with the mobile phone number of the citizen
     * who've ordered the payment.
     */
    "x-wrtn-payment-citizen-mobile"?: true;
  }
}
