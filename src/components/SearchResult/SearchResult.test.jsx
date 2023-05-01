import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import DataTable from "./SearchResult";

describe("DataTable", () => {
  const props = {
    userData: {
      user: "1001",
      totalRewardPoints: 0,
      transactionList: [],
    },
    loading: false,
    error: "",
  };

  const userData = {
    user: "1001",
    totalRewardPoints: 800,
    transactionList: [
      {
        transactionId: "01GZCGRYV87GSB1B066Z22VWMV",
        userId: "1001",
        cost: 9.43,
        transactionTime: "2023-04-05T14:03:09Z",
        reward: 0,
      },
      {
        transactionId: "01GZCGRYWHJ5JBBFTNKG61TCEX",
        userId: "1001",
        cost: 475.64,
        transactionTime: "2023-04-12T10:20:04Z",
        reward: 800,
      },
    ],
  };

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
    const wrapper = render(<DataTable {...props} userData={userData} />);
    expect(wrapper.getByTestId("user-id")).toHaveTextContent("1001");
    expect(wrapper.getByTestId("total-reward")).toHaveTextContent("800");
  });

  it("should use button to control whether to show transaction table", () => {
    const wrapper = render(<DataTable {...props} userData={userData} />);
    const button = wrapper.getByTestId("show-table");
    const table = wrapper.getByTestId("transaction-table");
    expect(table).toBeInTheDocument();
    fireEvent.click(button);
    expect(table).toHaveClass("hidden");
  });

  it("should render a message when there is no transactions", () => {
    const wrapper = render(<DataTable {...props} />);
    const message = wrapper.getByText(
      "No available transactions at this time."
    );
    expect(message).toBeInTheDocument();
  });

  it("should render transaction data correctly", () => {
    const wrapper = render(<DataTable {...props} userData={userData} />);
    const transactionTable = wrapper.getByTestId("transaction-table");
    expect(wrapper.getByText("01GZCGRYV87GSB1B066Z22VWMV")).toBeInTheDocument();
    expect(wrapper.getByText("01GZCGRYWHJ5JBBFTNKG61TCEX")).toBeInTheDocument();
    expect(wrapper.getByText("2023/4/5 07:03:09")).toBeInTheDocument();
    expect(wrapper.getByText("0")).toBeInTheDocument();
    expect(wrapper.getByText("2023/4/12 03:20:04")).toBeInTheDocument();
    expect(within(transactionTable).getByText("800")).toBeInTheDocument();
  });
});
