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
          "whitespace-nowrap text-[13px] font-medium sm:text-[15px]",
          caps ? "uppercase tracking-[0.08em]" : "tracking-tight",
        )}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
