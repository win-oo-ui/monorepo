import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Dot from "./Dot";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/Dot",
  component: Dot,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dot> = (args) => <Dot {...args} />;

export const Common = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
    hexCode: "red",
};
