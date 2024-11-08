import Image from "next/image";
import { useEffect, useState } from "react";

type SvgIconProps = {
  path:
    | "pot"
    | "hide-password"
    | "show-password"
    | "circle"
    | "close-modal"
    | "nav-overview"
    | "nav-transactions"
    | "nav-budgets"
    | "nav-pots"
    | "nav-recurring-bills"
    | "minimize-menu"
    | "search"
    | "caret-down"
    | "caret-left"
    | "caret-right"
    | "filter-mobile"
    | "sort-mobile"
    | "ellipsis"
    | "recurring-bills"
    | "bill-due"
    | "bill-paid";
};

function SvgIcon({ path }: SvgIconProps) {
  const [Svg, setSvg] = useState<null | string>(null);

  useEffect(() => {
    import(`@public/assets/images/icon-${path}.svg`).then((m) => setSvg(m.default));
  }, [path]);

  if (!Svg) return null;
  return <Image src={Svg} alt={path} />
}

export default SvgIcon;