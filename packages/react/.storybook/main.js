module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};
