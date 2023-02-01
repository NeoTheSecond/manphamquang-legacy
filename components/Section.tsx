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
        "after:content-[''] after:h-[1px] after:w-full after:bg-slate-200 dark:after:bg-cyan-800 dark:after:shadow dark:after:shadow-cyan-500/50 after:absolute after:bottom-0":
          breaker,
      })}
    >
      {children}
    </section>
  );
};

export default Section;
