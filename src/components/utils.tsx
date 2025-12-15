
import { ReactNode } from "react";

export const ExternalLink: React.FC<React.ComponentProps<'a'>> = ({ target, rel, ...props }) => {
  return (
    <a {...props}
      target={target ?? "_blank"}
      rel={(rel ? rel + " " : "") + "noopener noreferrer"}
    />
  );
};

export type StyledLinkProps = React.ComponentProps<'a'> & {
  isExternal?: boolean;
};

export const StyledLink: React.FC<StyledLinkProps> = ({ isExternal, className, ...props }) => {
  const classes = (className ? className + " " : "") + "underline " +
    "text-foreground/70 hover:text-primary/80 transition-colors";

  return (
    isExternal === true ?
      <ExternalLink {...props} className={classes} /> :
      <a {...props} className={classes} />
  );
};

export const Bold: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <span className={"font-bold text-foreground/55"}>{children}</span>;
};