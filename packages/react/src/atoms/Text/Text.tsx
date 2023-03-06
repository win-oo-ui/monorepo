import React, { ReactNode, useMemo } from "react";
import { FontSize } from "@winoo/foundation";

export interface TextProps {
  size?: keyof typeof FontSize;
  children: ReactNode;
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
  const classes = useMemo(() => {
    return `wo-text-${size}`;
  }, [size]);

  return <span className={classes}>{children}</span>;
};

export default Text;
