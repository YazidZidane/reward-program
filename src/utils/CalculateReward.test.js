import CalculateReward from "./CalculateReward";

describe("CalculateReward function", () => {
  const records = [
    {
      userId: "1001",
      transactionId: "01GZ4P14EH2C9C36XMTFHP9G0Z",
      cost: 395.01,
      transactionTime: "2023-01-06 13:36:38",
    },
    {
      userId: "1001",
      transactionId: "01GZ4P14SFN8FAVVBRPA9PAJGX",
      cost: 276.16,
      transactionTime: "2023-01-06 22:25:16",
    },
  ];

  const record = {
    userId: "1001",
    transactionId: "01GZ4P14SFN8FAVVBRPA9PAJGX",
    cost: 30,
    transactionTime: "2023-01-06 22:25:16",
  };

  test("Calculates total cost and total reward correctly", () => {
    const { totalRewards } = CalculateReward(records);
    expect(totalRewards).toBe(1042);
  });

  test("Total rewards and cost are 0 reward if there is no transactions", () => {
    const { totalCost, totalRewards } = CalculateReward([]);

    expect(totalRewards).toBe(0);
  });

  test("Total rewards is 0 reward if the cost is less than 50", () => {
    const { totalRewards } = CalculateReward([record]);
    expect(totalRewards).toBe(0);
  });

  test("Returns correct reward if the cost is between 50 and 100", () => {
    const { totalRewards } = CalculateReward([{ ...record, cost: 75 }]);
    expect(totalRewards).toBe(25);
  });

  test("Returns correct reward if the cost is greater than 100", () => {
    const { totalRewards } = CalculateReward([{ ...record, cost: 150 }]);
    expect(totalRewards).toBe(150);
  });
});
