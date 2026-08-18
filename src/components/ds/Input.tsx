import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "border-2 border-ink bg-white text-ink px-3 py-2.5 font-sans text-base outline-none focus:shadow-hard-sm transition-shadow placeholder:text-ink/40",
        className
      )}
      {...rest}
    />
  );
}
