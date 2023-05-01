import React from "react";
import { fireEvent, render, act, screen } from "@testing-library/react";
import SearchRewardsAndTransactions from "./SearchRewardsAndTransactions";

describe("SearchRewardsAndTransactions", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render correct SearchRewardsAndTransactions with all components", async () => {
    const wrapper = await act(async () =>
      render(<SearchRewardsAndTransactions />)
    );
    const dropdown = wrapper.getByLabelText("Input User ID:");
    expect(dropdown).toBeInTheDocument();
    const startDatePicker = wrapper.getByLabelText(
      "Search reward points and transactions for this user from"
    );
    expect(startDatePicker).toBeInTheDocument();
    const endDatePicker = wrapper.getByLabelText("to");
    expect(endDatePicker).toBeInTheDocument();
    const getResultButton = wrapper.getByText("GET RESULT");
    expect(getResultButton).toBeInTheDocument();
    const clearButton = wrapper.getByText("CLEAR");
    expect(clearButton).toBeInTheDocument();
  });

  it("should render select and can update it", async () => {
    const wrapper = await act(async () =>
      render(<SearchRewardsAndTransactions />)
    );
    const dropdown = wrapper.getByLabelText("Input User ID:");
    fireEvent.change(dropdown, { target: { value: "1001" } });
    expect(dropdown.value).toBe("1001");
  });

  it("should render date pickers and can change the value of it", async () => {
    const wrapper = await act(async () =>
      render(<SearchRewardsAndTransactions />)
    );
    const startDatePicker = wrapper.getByLabelText(
      "Search reward points and transactions for this user from"
    );
    fireEvent.change(startDatePicker, { target: { value: "2023-01-02" } });
    expect(startDatePicker.value).toBe("2023-01-02");
    const endDatePicker = wrapper.getByLabelText("to");
    fireEvent.change(endDatePicker, { target: { value: "2023-01-03" } });
    expect(endDatePicker.value).toBe("2023-01-03");
  });

  it("should show alerts when not given user", async () => {
    window.alert = jest.fn();
    const wrapper = await act(async () =>
      render(<SearchRewardsAndTransactions />)
    );
    const getResultButton = wrapper.getByText("GET RESULT");
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith("Please select a user ID first!");
    const dropdown = wrapper.getByLabelText("Input User ID:");
    fireEvent.change(dropdown, { target: { value: "1001" } });
    const startDatePicker = wrapper.getByLabelText(
      "Search reward points and transactions for this user from"
    );
    fireEvent.change(startDatePicker, { target: { value: "2023-01-31" } });
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith("Please provide all time!");
    const endDatePicker = wrapper.getByLabelText("to");
    fireEvent.change(endDatePicker, { target: { value: "2023-01-01" } });
    fireEvent.click(getResultButton);
    expect(window.alert).toBeCalledWith(
      "Please provide available time period!"
    );
  });

  it("should fetch data from backend if inputs are correct and click GET RESULT button", async () => {
    const wrapper = await act(async () =>
      render(<SearchRewardsAndTransactions />)
    );
    const dropdown = wrapper.getByLabelText("Input User ID:");
    fireEvent.change(dropdown, { target: { value: "1001" } });
    const getResultButton = wrapper.getByText("GET RESULT");
    fireEvent.click(getResultButton);
    expect(await screen.findByTestId("loading")).toBeInTheDocument();
    jest.advanceTimersByTime(1000);
    expect(await screen.findByTestId("user-id")).toHaveTextContent("1001");
    expect(await screen.findByTestId("total-reward")).toHaveTextContent(
      "13254"
    );
  });

  it("should clear all fields after clicked CLEAR button", async () => {
    const wrapper = await act(async () =>
      render(<SearchRewardsAndTransactions />)
    );
    const dropdown = wrapper.getByLabelText("Input User ID:");
    fireEvent.change(dropdown, { target: { value: "1001" } });

    const clearButton = wrapper.getByText("CLEAR");
    fireEvent.click(clearButton);
    expect(dropdown.value).toBe("");
  });
});
