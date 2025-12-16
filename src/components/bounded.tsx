import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
};

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  id,
  ...restProps
}: BoundedProps) => {
  return (
    <Comp
      id={id}
      className={cn(
        "relative overflow-hidden py-24 lg:py-32 min-h-screen flex items-center justify-center",
        className
      )}
      {...restProps}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {children}
      </div>
    </Comp>
  );
};
