import transactionData from "./MOCK_DATA.json";

export const getCustomerList = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const customerList = transactionData
        .map((transaction) => transaction.userId)
        .filter((userId, index, arr) => arr.indexOf(userId) === index);
      res(customerList);
    }, 1000);
  });
};

export const getCustomerTransactions = (userId, start, end) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const userData = transactionData.filter(
        (transaction) => transaction.userId === userId
      )[0];
      // if no such user
      if (userData === undefined) {
        rej("No such user!");
        return;
      }
      const { transactions } = userData;
      // if no transactions with such user(this would work)
      start === "" && end === ""
        ? res(transactions)
        : res(
            transactions.filter(
              (transaction) =>
                new Date(transaction.transactionTime) >= new Date(start) &&
                new Date(transaction.transactionTime) <= new Date(end)
            )
          );
    }, 1000);
  });
};
