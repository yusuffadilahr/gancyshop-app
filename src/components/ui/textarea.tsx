import * as React from "react";

import { cn } from "@/lib/utils";
interface ITextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextArea>(
  ({ className, required, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
