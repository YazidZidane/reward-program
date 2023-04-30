import React from "react";
import {
  findByText,
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import SelectionBar from "./SelectionBar";
import { wait } from "@testing-library/user-event/dist/utils";

// "GET RESULT" button is rendered and fetches data from the API when clicked and all necessary fields are filled.
// "CLEAR" button is rendered and resets the state when clicked.
// DataTable component is rendered when the "GET RESULT" button is clicked and data is fetched successfully.

describe("SelectionBar", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render correct SelectionBar with all components", () => {
    const wrapper = render(<SelectionBar />);
    const input = wrapper.getByLabelText("Input userID:");
    expect(input).toBeInTheDocument();
    const getAllCheckBox = wrapper.getByLabelText("Get all reward points");
    expect(getAllCheckBox).toBeInTheDocument();
    const getByDateCheckBox = wrapper.getByLabelText(
      "Get reward points in a given time period"
    );
    expect(getByDateCheckBox).toBeInTheDocument();
    const startDatePicker = wrapper.getByLabelText("Start date:");
    expect(startDatePicker).toBeInTheDocument();
    const endDatePicker = wrapper.getByLabelText("End date:");
    expect(endDatePicker).toBeInTheDocument();
    const getByMonthCheckBox = wrapper.getByLabelText(
      "Get transactions in a month"
    );
    expect(getByMonthCheckBox).toBeInTheDocument();
    const monthPicker = wrapper.getByLabelText("Select month:");
    expect(monthPicker).toBeInTheDocument();
    const getResultButton = wrapper.getByText("GET RESULT");
    expect(getResultButton).toBeInTheDocument();
    const clearButton = wrapper.getByText("CLEAR");
    expect(clearButton).toBeInTheDocument();
  });

  it("should render input fields and can update it", () => {
    const wrapper = render(<SelectionBar />);
    const input = wrapper.getByLabelText("Input userID:");
    fireEvent.change(input, { target: { value: "1001" } });
    expect(input.value).toBe("1001");
  });

  it("should render all checkbox and can check it", () => {
    const wrapper = render(<SelectionBar />);
    const getAllCheckBox = wrapper.getByLabelText("Get all reward points");
    const getByDateCheckBox = wrapper.getByLabelText(
      "Get reward points in a given time period"
    );
    const getByMonthCheckBox = wrapper.getByLabelText(
      "Get transactions in a month"
    );
    fireEvent.click(getAllCheckBox);
    expect(getAllCheckBox).toBeChecked();
    fireEvent.click(getByDateCheckBox);
    expect(getByDateCheckBox).toBeChecked();
    expect(getAllCheckBox).not.toBeChecked();
    fireEvent.click(getByMonthCheckBox);
    expect(getByMonthCheckBox).toBeChecked();
    expect(getByDateCheckBox).not.toBeChecked();
  });

  it("should render date pickers and can change the value of it", () => {
    const wrapper = render(<SelectionBar />);
    const getByDateCheckBox = wrapper.getByLabelText(
      "Get reward points in a given time period"
    );
    fireEvent.click(getByDateCheckBox);
    const startDatePicker = wrapper.getByLabelText("Start date:");
    fireEvent.change(startDatePicker, { target: { value: "2023-01-02" } });
    expect(startDatePicker.value).toBe("2023-01-02");
    const endDatePicker = wrapper.getByLabelText("End date:");
    fireEvent.change(endDatePicker, { target: { value: "2023-01-03" } });
    expect(endDatePicker.value).toBe("2023-01-03");
  });

  it("should render month pickers and can change the value of it", () => {
    const wrapper = render(<SelectionBar />);
    const getByMonthCheckBox = wrapper.getByLabelText(
      "Get transactions in a month"
    );
    fireEvent.click(getByMonthCheckBox);
    const monthPicker = wrapper.getByLabelText("Select month:");
    fireEvent.change(monthPicker, { target: { value: "2023-02" } });
    expect(monthPicker.value).toBe("2023-02");
  });

  it("should show alerts when not given user", () => {
    window.alert = jest.fn();
    const wrapper = render(<SelectionBar />);
    const getResultButton = wrapper.getByText("GET RESULT");
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith("Please input a user ID first!");
    const input = wrapper.getByLabelText("Input userID:");
    fireEvent.change(input, { target: { value: "1001" } });
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith("Please provide a method!");
    const getByDateCheckBox = wrapper.getByLabelText(
      "Get reward points in a given time period"
    );
    fireEvent.click(getByDateCheckBox);
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith("Please provide all time!");
    const startDatePicker = wrapper.getByLabelText("Start date:");
    fireEvent.change(startDatePicker, { target: { value: "2023-01-31" } });
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith("Please provide all time!");
    const endDatePicker = wrapper.getByLabelText("End date:");
    fireEvent.change(endDatePicker, { target: { value: "2023-01-01" } });
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith(
      "Please provide available time period!"
    );
  });

  it("should fetch data from backend if inputs are correct and click GET RESULT button", async () => {
    const wrapper = render(<SelectionBar />);
    const input = wrapper.getByLabelText("Input userID:");
    fireEvent.change(input, { target: { value: "1001" } });
    const getAllCheckBox = wrapper.getByLabelText("Get all reward points");
    fireEvent.click(getAllCheckBox);
    const getResultButton = wrapper.getByText("GET RESULT");
    fireEvent.click(getResultButton);
    jest.advanceTimersByTime(1000);
    expect(await screen.findByText("User:")).toBeInTheDocument();
    expect(await screen.findByText("1001")).toBeInTheDocument();
    expect(await screen.findByText("Total Cost:")).toBeInTheDocument();
    expect(await screen.findByText("4101.04")).toBeInTheDocument();
    expect(await screen.findByText("Total Reward Points:")).toBeInTheDocument();
    expect(await screen.findByText("6064")).toBeInTheDocument();
  });

  it("should clear all fields after clicked CLEAR button", () => {
    const wrapper = render(<SelectionBar />);
    const input = wrapper.getByLabelText("Input userID:");
    fireEvent.change(input, { target: { value: "1001" } });
    const getAllCheckBox = wrapper.getByLabelText("Get all reward points");
    fireEvent.click(getAllCheckBox);
    const clearButton = wrapper.getByText("CLEAR");
    fireEvent.click(clearButton);
    expect(input.value).toBe("");
    expect(getAllCheckBox).not.toBeChecked();
  });
});
