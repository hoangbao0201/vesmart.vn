import type { SITE_CONFIG_TYPE } from "@/configs/site.config";

/** Phần bổ sung cho schema.org Offer: vận chuyển và chính sách đổi trả (Google Merchant / Product). */
export function buildOfferShippingAndReturnPolicy(site: SITE_CONFIG_TYPE): {
    shippingDetails: Record<string, unknown>;
    hasMerchantReturnPolicy: Record<string, unknown>;
} {
    const m = site.merchant;
    return {
        shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
                "@type": "MonetaryAmount",
                value: String(m.shipping.rateValueVnd),
                currency: site.currency,
            },
            shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: m.shipping.destinationCountry,
            },
            deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: m.shipping.handlingDaysMin,
                    maxValue: m.shipping.handlingDaysMax,
                    unitCode: "DAY",
                },
                transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: m.shipping.transitDaysMin,
                    maxValue: m.shipping.transitDaysMax,
                    unitCode: "DAY",
                },
            },
        },
        hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: m.returns.applicableCountry,
            returnPolicyCategory: m.returns.returnPolicyCategory,
            merchantReturnDays: m.returns.merchantReturnDays,
            returnMethod: m.returns.returnMethod,
            returnFees: m.returns.returnFees,
            ...(m.returns.policyPageUrl ? { url: m.returns.policyPageUrl } : {}),
        },
    };
}
