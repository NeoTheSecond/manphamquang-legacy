import { DocumentRendererProps } from "@keystone-6/document-renderer";

const renderer: DocumentRendererProps["renderers"] = {
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
  },
  block: {
    paragraph: ({ children, textAlign }) => {
      return <p style={{ textAlign }}>{children}</p>;
    },
    heading: ({ level, children }) => {
      switch (level) {
        case 1:
          return <h1 className="text-3xl">{children}</h1>;
        case 2:
          return <h2 className="text-2xl">{children}</h2>;
        default:
          return <h2 className="text-xl">{children}</h2>;
      }
    },
  },
};

export default renderer;
