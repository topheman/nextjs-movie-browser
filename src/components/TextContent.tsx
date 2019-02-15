/**
 * Takes a string as children
 * Return ONE or MULTIPLE <p> tags split inside from the \n\n
 */
const TextContent: React.SFC<
  { children: string } & React.HTMLAttributes<HTMLElement>
> = ({ children, ...props }) => (
  <>
    {children.split(`\n\n`).map((paragraph, index) => (
      <p {...props} key={index}>
        {paragraph}
      </p>
    ))}
  </>
);

export default TextContent;
