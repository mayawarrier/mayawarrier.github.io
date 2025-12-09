
export type ExternalLinkProps = Omit<React.ComponentProps<'a'>, "target">;

export const ExternalLink: React.FC<ExternalLinkProps> = (props) => {
  return (
    <a {...props}
      target="_blank"
      rel={(props.rel ? props.rel + " " : "") + "noopener noreferrer"}
    />
  );
};

export type StyledLinkProps =
  | (ExternalLinkProps & { isExternal: true; })
  | (React.ComponentProps<'a'> & { isExternal?: false; });

export const StyledLink: React.FC<StyledLinkProps> = ({
  isExternal,
  className,
  ...baseProps // this seems to break the discrim union
}) => {
  const classes = className ?? "underline " + 
    "text-foreground/70 hover:text-primary/80 transition-colors";

  return (
    isExternal === true ?
      <ExternalLink {...baseProps} className={classes} /> :
      <a {...baseProps} className={classes} />
  );
};