import { DocumentRendererProps } from "@keystone-6/document-renderer";

const renderer: DocumentRendererProps["renderers"] = {
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
  },
  block: {
    paragraph: ({ children, textAlign }) => {
      return (
        <p style={{ textAlign }} className="text-md">
          {children}
        </p>
      );
    },
    heading: ({ level, children }) => {
      switch (level) {
        case 1:
          return <h1 className="my-6 text-3xl">{children}</h1>;
        case 2:
          return <h2 className="my-5 text-3xl">{children}</h2>;
        case 3:
          return <h3 className="my-3 text-xl">{children}</h3>;
        default:
          return <h2 className="text-xl">{children}</h2>;
      }
    },
    code: ({ children }) => {
      return (
        <pre className="p-2 my-2 rounded bg-slate-100 dark:bg-slate-800">
          {children}
        </pre>
      );
    },
  },
};

export default renderer;
