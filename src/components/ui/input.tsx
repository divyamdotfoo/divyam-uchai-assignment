import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border outline-none bg-white px-3 py-2 text-base focus-within:ring-1 border-transparent focus-within:ring-amber-400 focus-within:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-black",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
