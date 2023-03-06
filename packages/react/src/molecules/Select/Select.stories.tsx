import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Select from "./Select";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Molecules/Select",
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

interface SampleProps {
  id: string;
  value: string;
}

const mockData: SampleProps[] = [
  {
    id: "1",
    value: "Value1",
  },
  {
    id: "2",
    value: "Value2",
  },
];

export const Common = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  options: mockData,
  labelExtractor: (item: SampleProps) => item.value,
  keyExtractor: (item: SampleProps) => item.id,
  label: "Default Selector...",
};
