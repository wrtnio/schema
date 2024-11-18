/**
 * Collection of payment plugins.
 *
 * @author Samchon
 */
export namespace ISwaggerSchemaPaymentPlugin {
  /**
   * Price amount plugin property.
   */
  export interface IPriceAmount {
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
  }

  /**
   * Price currency plugin property.
   */
  export interface IPriceCurrency {
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
   * Vendor plugin properties.
   */
  export interface IVendor {
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
  }
}
