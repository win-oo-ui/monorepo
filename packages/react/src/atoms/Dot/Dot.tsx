import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { Spacing } from "@winoo/foundation";

export interface DotProps {
  hexCode?: string;
  size?: keyof typeof Spacing;
  style?: CSSProperties;
  onClick?: (event: MouseEvent) => void;
}

const Dot: React.FC<DotProps> = ({ hexCode, size = Spacing.xxxs, style }) => {
  const [propHexColorStyle, setPropHexColorStyle] = useState<CSSProperties>({});

  useEffect(() => {
    let modStyle = {};

    // If Hexcode and Size Both Are Included
    if (hexCode) {
      modStyle = {
        backgroundColor: hexCode,
      };
    }
    // If Only Hexcode is Included
    else if (hexCode) {
      modStyle = {
        backgroundColor: hexCode,
      };
    }

    setPropHexColorStyle(modStyle);
  }, [hexCode]);

  const classes = useMemo(() => {
    return `wo-dot__container wo-width-${size} wo-height-${size} wo-radius-${size}`;
  }, [size]);

  return (
    <span className={classes} style={{ ...propHexColorStyle, ...style }}></span>
  );
};

export default Dot;
