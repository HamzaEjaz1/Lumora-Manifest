import { siteConfig } from "@/config/site";

export function JsonLd({ description }: { description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: ["en", "ru", "ar", "id", "es", "zh"],
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "iOS",
        description,
        offers: siteConfig.pricing.plans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          price: plan.amount.toFixed(2),
          priceCurrency: siteConfig.pricing.currency,
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
