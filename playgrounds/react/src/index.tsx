import React from "react";
import { createRoot } from "react-dom/client";
import { Dot, Text, Box, Select } from "@winoo/react";
import { FontSize, Spacing } from "@winoo/foundation";
// Importing All Css
import "@winoo/scss/lib/Select.css";
import "@winoo/scss/lib/Button.css";
import "@winoo/scss/lib/Text.css";
import "@winoo/scss/lib/Dot.css";
import "@winoo/scss/lib/Utilities.css";
import "@winoo/scss/lib/global.css";

const container = document.getElementById("app-root");
const root = createRoot(container!);

const mockData: { id: string; item_name: string }[] = [
  {
    id: "1",
    item_name: "Data base",
  },
  {
    id: "2",
    item_name: "Data base2",
  },
  {
    id: "3",
    item_name: "Hello World",
  },
];

const App = () => {
  return (
    <>
      <Box margin={{ value: Spacing.lg }}>
        <Text size={FontSize.base}>Hello</Text>
        <Dot hexCode="#ff0000" size={Spacing.xxxs} />
        <Dot hexCode="#ff0000" size={Spacing.xxs} />
        <Dot hexCode="#ff0000" size={Spacing.xs} />
        <Dot hexCode="#ff0000" size={Spacing.sm} />
        <Dot hexCode="#ff0000" size={Spacing.md} />
        <Dot hexCode="black" size={Spacing.lg} />
        <Dot hexCode="black" size={Spacing.xl} />
        <Dot hexCode="black" size={Spacing.xxl} />
        <Dot hexCode="black" size={Spacing.xxxl} />
      </Box>
      <Box margin={{ value: Spacing.lg }}>
        <Select
          options={mockData}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.item_name}
        />
      </Box>
    </>
  );
};

root.render(<App />);
