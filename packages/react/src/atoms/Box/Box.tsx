import { Spacing, PositionType } from "@winoo/foundation";
import React, { ReactNode, useMemo } from "react";

export interface HelperPositionProps extends PositionType {
  value?: keyof typeof Spacing;
}

interface BoxProps {
  children: ReactNode;
  margin?: HelperPositionProps;
  padding?: HelperPositionProps;
  elementType?: keyof JSX.IntrinsicElements;
}

const Box: React.FC<BoxProps> = ({
  children,
  margin,
  padding,
  elementType: Wrapper = "div",
}) => {
  const classes = useMemo(() => {
    let modClasses = ``;

    if (
      margin?.value &&
      !(margin?.top || margin?.bottom || margin?.left || margin?.right)
    ) {
      modClasses += ` wo-margin-${margin.value}`;
    }

    if (margin?.left) {
      modClasses += ` wo-margin-left-${margin.left}`;
    }

    if (margin?.right) {
      modClasses += ` wo-margin-right-${margin.right}`;
    }

    if (margin?.top) {
      modClasses += ` wo-margin-top-${margin.top}`;
    }

    if (margin?.bottom) {
      modClasses += ` wo-margin-bottom-${margin.bottom}`;
    }

    if (padding?.value) {
      modClasses += ` wo-padding-${padding.value}`;
    }

    if (padding?.left) {
      modClasses += ` wo-padding-left-${padding.left}`;
    }

    if (padding?.right) {
      modClasses += ` wo-padding-right-${padding.right}`;
    }

    if (padding?.top) {
      modClasses += ` wo-padding-top-${padding.top}`;
    }

    if (padding?.bottom) {
      modClasses += ` wo-padding-bottom-${padding.bottom}`;
    }

    return modClasses;
  }, [margin]);

  return <Wrapper className={classes}>{children}</Wrapper>;
};

export default Box;
