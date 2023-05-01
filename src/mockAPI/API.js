import transactionData from "./MOCK_DATA.json";

export const getUserList = async () => {
  return transactionData
    .map((transaction) => transaction.userId)
    .filter((userId, index, arr) => arr.indexOf(userId) === index)
    .sort();
};

export const getCustomerTransactions = (userId, start, end) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const userTransactions = transactionData.filter(
        (transaction) => transaction.userId === userId
      );
      // if no such user
      if (userTransactions === undefined) {
        rej("No such user!");
        return;
      }
      start === "" && end === ""
        ? res(userTransactions)
        : res(
            userTransactions.filter(
              (transaction) =>
                new Date(transaction.transactionTime) >= new Date(start) &&
                new Date(transaction.transactionTime) <= new Date(end)
            )
          );
    }, 1000);
  });
};
