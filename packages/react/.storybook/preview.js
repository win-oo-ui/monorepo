import "@winoo/scss/lib/Select.css";
import "@winoo/scss/lib/Button.css";
import "@winoo/scss/lib/Text.css";
import "@winoo/scss/lib/Dot.css";
import "@winoo/scss/lib/Utilities.css";
import "@winoo/scss/lib/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
