import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Wordmark({ caps = false, className }: { caps?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ background: "linear-gradient(135deg, #f4b6c8, #f0c7ae, #cbb8ea)" }}
      />
      <span
        className={cn(
          "text-[13px] font-medium leading-tight sm:text-[15px]",
          caps ? "wordmark-caps" : "whitespace-nowrap tracking-tight",
        )}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
