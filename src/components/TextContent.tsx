import React from "react";

/**
 * Takes a string as children
 * Return ONE or MULTIPLE <p> tags split inside from the \n\n
 * - dir="auto" adapts ltr or rtl (right to left) languages (like perse/hebrew)
 * - text-align: initial to make sure to override `-webkit-match-parent` if set (which won't take language direction in account)
 */
const TextContent: React.FunctionComponent<
  { children: string } & React.HTMLAttributes<HTMLElement>
> = ({ children, style, ...props }) => (
  <>
    {children.split(`\n\n`).map((paragraph, index) => (
      <p
        dir="auto"
        style={{ textAlign: "initial", ...style }}
        {...props}
        key={index}
      >
        {paragraph}
      </p>
    ))}
  </>
);

export default TextContent;
