import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingCard({
  name,
  price,
  cadence,
  features,
  cta,
  href,
  featured = false,
  badge,
}: {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
}) {
  return (
    <article
      className={cn(
        "glass-card flex h-full flex-col p-7 md:p-8",
        featured && "border-white bg-white/[0.06]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-medium text-cream">{name}</h3>
        {badge ? (
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-black">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-6 flex items-end gap-2 text-cream">
        <span className="text-5xl font-light tracking-tight">{price}</span>
        <span className="pb-1 text-sm text-pink-muted">{cadence}</span>
      </p>
      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-pink-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        className={cn(buttonVariants({ variant: featured ? "default" : "outline" }), "mt-8")}
      >
        {cta}
      </a>
    </article>
  );
}
