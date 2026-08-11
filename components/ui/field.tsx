import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Modernist form controls, built on native elements — no script, no ARIA
 * scaffolding to keep in sync. The landing raises the system's 36px minimum
 * to 44px so every control clears the touch target guidance.
 */

const control = cn(
  "w-full min-h-[44px] px-2.5 py-1.5",
  // `font: inherit` in the system sheet — form controls do not inherit the
  // page family on their own.
  "bg-surface text-text caret-accent font-body text-[14px]",
  "border border-divider rounded-md",
  "hover:border-text/45",
  "focus-visible:border-accent focus-visible:outline-offset-0",
  "transition-colors duration-150",
);

export function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-label font-semibold uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "min-h-[90px] resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(control, className)} {...props}>
      {children}
    </select>
  );
}
