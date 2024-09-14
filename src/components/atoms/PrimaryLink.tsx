import { Link } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
  href: string | undefined;
  children: ReactNode;
}

export const PrimaryLink:FC<Props> = memo((props) => {
  const { href, children } = props;
  return (
    <Link href={href} isExternal display='block'>
      {children}
    </Link>
  )
})