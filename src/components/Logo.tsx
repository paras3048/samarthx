import logoRaw from "@/assets/samarthx-logo.svg?raw";
import { cn } from "@/lib/utils";

export function Logo({ className, draw = false, wordmarkOnly = false }: { className?: string; draw?: boolean; wordmarkOnly?: boolean }) {
  return (
    <span
      role="img"
      aria-label={wordmarkOnly ? "SamarthX" : "SamarthX eGov"}
      className={cn("block [&>svg]:h-auto [&>svg]:w-full", draw && "logo-draw", className)}
      dangerouslySetInnerHTML={{ __html: wordmarkOnly ? logoRaw.replace('viewBox="0 0 1900 624"', 'viewBox="0 114 1900 279"') : logoRaw }}
    />
  );
}
