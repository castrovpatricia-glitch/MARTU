import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "rounded-2xl bg-white text-ink px-4 py-3 font-sans text-base outline-none focus:shadow-hard-sm transition-shadow placeholder:text-ink/40",
        className
      )}
      {...rest}
    />
  );
}
