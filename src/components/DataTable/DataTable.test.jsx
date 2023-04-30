import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DataTable from "./DataTable";

// Calculates total cost and total reward correctly

describe("DataTable", () => {
  const props = {
    user: "1001",
    userData: [],
    loading: false,
    error: "",
  };

  const testData = [
    {
      transactionId: "01GZ4P14EH2C9C36XMTFHP9G0Z",
      cost: 395.01,
      transactionTime: "2023-01-06 13:36:38",
    },
    {
      transactionId: "01GZ4P14SFN8FAVVBRPA9PAJGX",
      cost: 276.16,
      transactionTime: "2023-01-06 22:25:16",
    },
  ];

  it("should render loading div when loading props is true", () => {
    const wrapper = render(<DataTable {...props} loading={true} />);
    const isLoading = wrapper.getByTestId("loading");
    expect(isLoading).toBeInTheDocument();
  });

  it("should show error message when error props is not empty string", () => {
    const wrapper = render(<DataTable {...props} error={"No such user!"} />);
    const errorMsg = wrapper.getByText("No such user!");
    expect(errorMsg).toBeInTheDocument();
  });

  it("should render user, total cost and correct total reward", () => {
    const wrapper = render(<DataTable {...props} userData={testData} />);
    expect(wrapper.getByText("User:")).toBeInTheDocument();
    expect(wrapper.getByText("1001")).toBeInTheDocument();
    expect(wrapper.getByText("Total Cost:")).toBeInTheDocument();
    expect(wrapper.getByText("671.17")).toBeInTheDocument();
    expect(wrapper.getByText("Total Reward Points:")).toBeInTheDocument();
    expect(wrapper.getByText("1042")).toBeInTheDocument();
  });

  it("should use button to control whether to show transaction table", () => {
    const wrapper = render(<DataTable {...props} userData={testData} />);
    const button = wrapper.getByTestId("show-table");
    fireEvent.click(button);
    const table = wrapper.getByTestId("transaction-table");
    expect(table).toBeInTheDocument();
    fireEvent.click(button);
    expect(table).toHaveClass("hidden");
  });

  it("should render a message when there is no transactions", () => {
    const wrapper = render(<DataTable {...props} />);
    const button = wrapper.getByTestId("show-table");
    fireEvent.click(button);
    const message = wrapper.getByText(
      "No available transactions at this time."
    );
    expect(message).toBeInTheDocument();
  });

  it("should render transaction data correctly", () => {
    const wrapper = render(<DataTable {...props} userData={testData} />);
    const button = wrapper.getByTestId("show-table");
    fireEvent.click(button);
    expect(wrapper.getByText("2023-01-06 13:36:38")).toBeInTheDocument();
    expect(wrapper.getByText("395.01")).toBeInTheDocument();
    expect(wrapper.getByText("2023-01-06 22:25:16")).toBeInTheDocument();
    expect(wrapper.getByText("276.16")).toBeInTheDocument();
  });
});
