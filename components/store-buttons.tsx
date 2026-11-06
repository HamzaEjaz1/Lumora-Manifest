import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function StoreButtons({
  appStoreLabel,
  className,
}: {
  appStoreLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("flex", className)}>
      <a className="btn btn-primary gap-2" href={siteConfig.links.appStore} rel="noreferrer">
        <AppleMark />
        {appStoreLabel}
      </a>
    </div>
  );
}

function AppleMark() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 fill-current">
      <path d="M11.2 8.4c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.3-2.5-1.4-1.1-.1-2.1.6-2.6.6s-1.4-.6-2.3-.6c-1.2 0-2.3.7-2.9 1.8-1.2 2.2-.3 5.4.9 7.1.6.9 1.3 1.8 2.2 1.8.9 0 1.2-.6 2.3-.6s1.4.6 2.3.6 1.5-.9 2.1-1.7c.7-1 .9-1.9 1-2 .1 0-1.9-.7-2-2.6zM9.7 3.7c.5-.6.8-1.4.7-2.2-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.6-.4 2.2-1.1z" />
    </svg>
  );
}
