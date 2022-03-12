import React from "react";
import classNames from "classnames";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  breaker?: boolean;
}

const Section = ({ className, children, breaker = true }: SectionProps) => {
  return (
    <section
      className={classNames("relative py-4 ", className, {
        "after:content-[''] after:h-[1px] after:w-full after:bg-slate-200 after:absolute after:bottom-0":
          breaker,
      })}
    >
      {children}
    </section>
  );
};

export default Section;
