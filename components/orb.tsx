import Image from "next/image";
import { cn } from "@/lib/utils";

export function Orb({ className, size = 72 }: { className?: string; size?: number }) {
  return (
    <div
      aria-hidden
      className={cn("relative shrink-0 overflow-hidden rounded-full motion-safe:animate-float", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/Logo.jpeg"
        alt=""
        fill
        sizes={`${size}px`}
        className="scale-[2.7] object-cover object-[50%_40%]"
      />
    </div>
  );
}
