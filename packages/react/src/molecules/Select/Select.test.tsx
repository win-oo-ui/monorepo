import React from "react";
import Select from "./Select";

import { fireEvent, render } from "@testing-library/react";

const mockData = [
  {
    id: "1",
    label: "Mg Mg",
    value: "mg",
  },
  {
    id: "2",
    label: "Ag Ag",
    value: "ag",
  },
  {
    id: "3",
    label: "Lwin",
    value: "lmp",
  },
];

// 1. Get All Length Of MockData to show correctly list
test("Render: All SelectorMock Data passed to it:/Molecules/Select", () => {
  const { getAllByRole, getByTestId } = render(
    <Select
      label="Hello World"
      options={mockData}
      labelExtractor={(item) => item.label}
    />
  );

  // First we need to open selector
  fireEvent.click(getByTestId("WinOoSelectorButton"));

  // Mokck Data Length must be same as Test Data Length
  expect(getAllByRole("menuitemradio")).toHaveLength(mockData.length);
});

// 2. If we use our custom Children List, We need to check parent data props
test("Can have pass valid Props with renderOption from Component:/Molecules/Select", () => {
  const { getAllByTestId, getByTestId } = render(
    <Select
      label="Hello World"
      options={mockData}
      labelExtractor={(item) => item.label}
      renderOption={({ item }) => {
        return <div data-testid="TestComponent">{item.label}</div>;
      }}
    />
  );

  // First we need to open selector
  fireEvent.click(getByTestId("WinOoSelectorButton"));

  // Mokck Data Length must be same as Custom Test Data Length
  expect(getAllByTestId("TestComponent")).toHaveLength(mockData.length);
});

// 3. When we click each item...
test("Can Get Correct Data when User Selected Item:/Molecules/Select", () => {
  const jestTestFunction = jest.fn();

  const { getAllByRole, getByTestId } = render(
    <Select
      label="Hello World"
      options={mockData}
      labelExtractor={(item) => item.label}
      onSelect={jestTestFunction}
    />
  );

  // First we need to open selector
  fireEvent.click(getByTestId("WinOoSelectorButton"));
  // Select First Row of items , index number => 0
  const firsSelectBox = getAllByRole("menuitemradio")[0];
  fireEvent.click(firsSelectBox);

  // JEST function will return as the same index[0] mock data and Index number Zero
  expect(jestTestFunction).toHaveBeenCalledWith(mockData[0], 0);
});

// 4. When we select item, Must change Selected Item to Select Box
test("Can Get Correct Selected Text Appear when User Selected Item:/Molecules/Select", () => {
  const { getAllByRole, getByTestId } = render(
    <Select
      label="Hello World"
      options={mockData}
      labelExtractor={(item) => item.label}
    />
  );

  // First we need to open selector
  fireEvent.click(getByTestId("WinOoSelectorButton"));
  // Select First Row of items , index number => 0
  const firsSelectBox = getAllByRole("menuitemradio")[0];
  fireEvent.click(firsSelectBox);

  // JEST function will return as the same index[0] mock data and Index number Zero
  expect(getByTestId("WinOoSelectorButton")).toHaveTextContent(
    mockData[0].label
  );
});

// 5. SnapShop testing...
test("SnapShop: Selector Mock Data:/Molecules/Select", () => {
  const { getAllByRole, getByTestId, asFragment } = render(
    <Select
      label="Hello World"
      options={mockData}
      labelExtractor={(item) => item.label}
    />
  );

  // First we need to open selector
  fireEvent.click(getByTestId("WinOoSelectorButton"));
  // Select First Row of items , index number => 0
  const firsSelectBox = getAllByRole("menuitemradio")[0];
  fireEvent.click(firsSelectBox);
  // JEST function will return as the same index[0] mock data and Index number Zero
  expect(asFragment()).toMatchSnapshot();
});

// 6. SnapShop Base testing...
test("SnapShop: Selector Base:/Molecules/Select", () => {
  const { asFragment } = render(
    <Select
      label="Base Framgment"
      options={mockData}
      labelExtractor={(item) => item.label}
    />
  );

  // JEST function will return as the same index[0] mock data and Index number Zero
  expect(asFragment()).toMatchSnapshot();
});

// 7. SnapShop Open State testing...
test("SnapShop: Selector Open State:/Molecules/Select", () => {
  const { asFragment, getByTestId } = render(
    <Select
      label="Open State Framgment"
      options={mockData}
      labelExtractor={(item) => item.label}
    />
  );

  // First we need to open selector
  fireEvent.click(getByTestId("WinOoSelectorButton"));

  // JEST function will return as the same index[0] mock data and Index number Zero
  expect(asFragment()).toMatchSnapshot();
});

// 8. Can Customize Selector Label
test("Can Customize Select Label in Atomic:Select:/Molecules/Select", () => {
  const { getByText } = render(
    <Select
      label="CUSTOM SELECT LABEL"
      options={mockData}
      labelExtractor={(item) => item.label}
    />
  );

  expect(getByText(/CUSTOM SELECT LABEL/)).toBeInTheDocument();
});
