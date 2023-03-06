import KeyboardKeys from "../KeyboardKeys";

test("Snapshop of KeyboardKeyss: Foundation", () => {
  expect(KeyboardKeys).toMatchSnapshot();
});
