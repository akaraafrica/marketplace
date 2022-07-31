import React from "react";
import Link, { LinkProps } from "next/link";

interface LinkWithProps extends LinkProps {
  children: JSX.Element[] | JSX.Element;
}
function NextLink(props: LinkWithProps) {
  return <Link style={{ textDecoration: "none" }} {...props} />;
}

export default NextLink;
