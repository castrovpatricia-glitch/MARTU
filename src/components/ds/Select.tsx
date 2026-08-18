import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "border-2 border-ink bg-white text-ink px-3 py-2.5 font-sans text-base outline-none focus:shadow-hard-sm transition-shadow appearance-none bg-[right_0.75rem_center] bg-no-repeat",
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='9'><path d='M1 1l6 6 6-6' stroke='%2314120f' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
      }}
      {...rest}
    >
      {children}
    </select>
  );
}
