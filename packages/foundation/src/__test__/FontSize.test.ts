import FontSize from "../FontSize";

test("Snapshop of fontsizes: Foundation", () => {
  expect(FontSize).toMatchSnapshot();
});
