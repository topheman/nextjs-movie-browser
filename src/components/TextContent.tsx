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
