export const siteConfig = {
  name: "LUMORA Manifest",
  url: "https://lumora.app",
  links: {
    appStore: "https://apps.apple.com/",
    x: "https://x.com/",
    instagram: "https://instagram.com/",
    tiktok: "https://www.tiktok.com/",
    supportEmail: "support@lumoramanifest.com",
  },
  pricing: {
    currency: "USD",
    plans: [
      { id: "explore", name: "Explore", cta: "Explore", amount: 5.99, interval: "week", storiesPerDay: 3, featured: false },
      { id: "plus", name: "LUMORA Manifest Plus", cta: "Plus", amount: 15.99, interval: "month", storiesPerDay: 5, featured: false },
      { id: "premium", name: "LUMORA Manifest Premium", cta: "Premium", amount: 21.99, interval: "month", storiesPerDay: 8, featured: true },
    ],
  },
  presetVoices: ["Emma", "Lauren", "Henry", "James"],
  testimonials: [
    {
      name: "Amira K.",
      detail: "Dubai",
      quote:
        "I played the love story on a walk home. It described a table set for two, and the goal felt close instead of far away.",
    },
    {
      name: "Mateo R.",
      detail: "Mexico City",
      quote:
        "The financial freedom chapter is the one I replay. It talks about my actual morning, not a generic affirmation.",
    },
    {
      name: "Sari W.",
      detail: "Jakarta",
      quote:
        "I started with a preset voice. Recording my own made the family story unexpectedly tender.",
    },
  ],
} as const;

export const ogLocales: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  ar: "ar_AR",
  id: "id_ID",
  es: "es_ES",
  zh: "zh_CN",
};

export function absoluteUrl(locale: string, path = ""): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}
