import { cn } from "@/lib/utils";

const heights = [38, 72, 48, 90, 56, 80, 42, 96, 60, 76, 46, 88, 54, 70, 40];

export function Waveform({
  active,
  label,
  bars = 42,
  className,
}: {
  active: boolean;
  label: string;
  bars?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex h-16 items-center gap-[3px]", className)}
      role="img"
      aria-label={label}
    >
      {Array.from({ length: bars }, (_, index) => {
        const height = heights[index % heights.length] ?? 50;
        return (
          <span
            key={index}
            className={cn(
              "w-[3px] origin-center rounded-full bg-pink",
              active && "motion-safe:animate-wave",
            )}
            style={{
              height: `${height}%`,
              animationDelay: `${(index % 12) * 0.07}s`,
              opacity: active ? 1 : 0.45,
            }}
          />
        );
      })}
    </div>
  );
}
