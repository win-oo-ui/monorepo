import Spacing from "./Spacing";

interface PositionType {
  left?: keyof typeof Spacing;
  right?: keyof typeof Spacing;
  top?: keyof typeof Spacing;
  bottom?: keyof typeof Spacing;
}

export default PositionType;
