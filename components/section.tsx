import { cn } from "@/lib/utils";
import { Container } from "@/components/container";

export function Section({
  id,
  labelledBy,
  className,
  children,
  contained = true,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
  contained?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-24 md:py-36", className)}
    >
      <div className="relative z-10">
        {contained ? <Container>{children}</Container> : children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="text-sm text-white/50">
      {children}
    </p>
  );
}
