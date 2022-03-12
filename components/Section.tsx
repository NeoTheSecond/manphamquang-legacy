import React from "react";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

const Section = ({ className, children }: SectionProps) => {
  return (
    <section
      className={`${className} relative py-4 after:content-[''] after:h-[1px] after:w-full after:bg-slate-200 after:absolute after:bottom-0`}
    >
      {children}
    </section>
  );
};

export default Section;
