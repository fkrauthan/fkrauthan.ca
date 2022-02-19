import { memo } from "react";

/* eslint-disable react/display-name */
const getComponent = (node) => {
  switch (node.type) {
    case "root":
      return ({ children }) => <>{children}</>;

    case "paragraph":
      return ({ children }) => <p>{children}</p>;

    case "emphasis":
      return ({ children }) => <em>{children}</em>;

    case "heading":
      return ({ children, depth = 2 }) => {
        const Heading = `h${depth}`;
        return <Heading>{children}</Heading>;
      };

    case "text":
      return ({ value }) => <>{value}</>;

    case "strong":
      return ({ children }) => <strong>{children}</strong>;

    case "blockquote":
      return ({ children }) => (
        <blockquote className="my-6 p-4 italic border-l-4 bg-gray-100 text-gray-600 border-gray-500 quote">
          {children}
        </blockquote>
      );

    case "list":
      return ({ children }) => <ul>{children}</ul>;

    case "listItem":
      return ({ children }) => <li>{children}</li>;

    case "inlineCode":
      return ({ value }) => <code>{value}</code>;
    /* Handle all types here … */

    default:
      console.warn("Unhandled node type", node);
      return ({ children }) => <>{children}</>;
  }
};

const Node = (node) => {
  const Component = getComponent(node);
  const { children } = node;

  return children ? (
    <Component {...node}>
      {children.map((child, index) => (
        <Node key={index} {...child} />
      ))}
    </Component>
  ) : (
    <Component {...node} />
  );
};

const MarkdownRenderer = (props) => <Node {...props.ast} />;
export default memo(MarkdownRenderer);
