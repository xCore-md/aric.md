import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-base font-semibold transition outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:!shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default1:
          "text-blue hover:blue-gradient shadow-btn ring-blue bg-white shadow-xs ring-1 ring-inset hover:text-black hover:ring-0",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs",
        outline:
          "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary hover:text-blue underline underline-offset-4",

        default: "default-btn-gradient",
        reverse: "default-btn-gradient-reverse disabled:!shadow-none",
        black:
          "bg-white text-black ring-1 ring-black ring-inset hover:bg-black hover:text-white",

        white:
          "active:hover:text-blue bg-white/10 text-white ring-1 ring-white ring-inset hover:bg-white hover:text-black",
      },
      size: {
        default: "h-12 px-5 py-2 [&_svg:not([class*='size-'])]:size-6",
        sm: "h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        lg: "h-14 px-12",
        icon: "size-12 flex-none [&_svg:not([class*='size-'])]:size-6",
        "sm-icon": "size-8 flex-none [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
