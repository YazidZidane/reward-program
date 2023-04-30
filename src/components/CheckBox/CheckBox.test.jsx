import React from "react";
import { fireEvent, getByText, render } from "@testing-library/react";
import { defaultMethods } from "../SelectionBar/SelectionBar";
import CheckBox from "./CheckBox";

describe("CheckBox", () => {
  const props = {
    name: defaultMethods.get_all_transactions,
    label: "test label",
    onChange: jest.fn(),
    checked: false,
  };

  it("should render a CheckBox with correct props", () => {
    const wrapper = render(<CheckBox {...props} />);
    const component = wrapper.getByLabelText("test label");
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute(
      "name",
      defaultMethods.get_all_transactions
    );
    expect(component).not.toBeChecked();
    fireEvent.click(component);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should render a checked CheckBox when checked props is true", () => {
    const wrapper = render(<CheckBox {...props} checked={true} />);
    const component = wrapper.getByLabelText("test label");
    expect(component).toBeChecked();
  });

  it("should render any children passed to it", () => {
    const wrapper = render(
      <CheckBox {...props}>
        <div>Test Child</div>
      </CheckBox>
    );
    expect(wrapper.getByText("Test Child")).toBeInTheDocument();
  });
});
