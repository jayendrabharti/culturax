"use client";

import * as React from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

export interface PhoneInputProps
  extends Omit<
    React.ComponentProps<typeof PhoneInputWithCountrySelect>,
    "flags" | "value" | "onChange"
  > {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

const PhoneInput = React.forwardRef<
  React.ElementRef<typeof PhoneInputWithCountrySelect>,
  PhoneInputProps
>(({ className, value, onChange, ...props }, ref) => {
  return (
    <PhoneInputWithCountrySelect
      ref={ref}
      flags={flags}
      value={value}
      onChange={onChange}
      countrySelectProps={{
        className: cn(
          "h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        ),
      }}
      numberInputProps={{
        className: cn(
          "h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ),
      }}
      className={cn("flex h-11 w-full gap-2", className)}
      {...props}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
