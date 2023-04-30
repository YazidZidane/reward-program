import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TimePicker, { defaultTime } from "./TimePicker";
import { timePickerTypes } from "../SelectionBar/SelectionBar";

describe("TimePicker", () => {
  const dateProps = {
    type: timePickerTypes.date,
    label: "Select a date:",
    value: "2023-01-01",
    onChange: jest.fn(),
    disabled: false,
  };

  it("should render with correct props", () => {
    const wrapper = render(<TimePicker {...dateProps} />);
    const component = wrapper.getByLabelText(dateProps.label);
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute("type", dateProps.type);
    expect(component).toHaveAttribute("value", dateProps.value);
    expect(component).toHaveAttribute("min", defaultTime.min_date);
    expect(component).toHaveAttribute("max", defaultTime.max_date);
    expect(component).not.toBeDisabled();
    fireEvent.change(component, { target: { value: "2023-01-02" } });
    expect(dateProps.onChange).toHaveBeenCalledTimes(1);
    expect(dateProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should render a month picker when type is month", () => {
    const wrapper = render(
      <TimePicker {...dateProps} type={timePickerTypes.month} />
    );
    const component = wrapper.getByLabelText(dateProps.label);
    expect(component).toHaveAttribute("type", timePickerTypes.month);
  });

  it("should disable the input when disabled prop is true", () => {
    const wrapper = render(<TimePicker {...dateProps} disabled={true} />);
    const component = wrapper.getByLabelText(dateProps.label);
    expect(component).toBeDisabled();
  });
});
