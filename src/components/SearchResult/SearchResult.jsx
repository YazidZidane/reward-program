import React, { useState } from "react";

import "../../styles/SearchResult.css";

export default function SearchResult({ userData, loading, error }) {
  const [showTable, setShowTable] = useState(true);

  return (
    <div className="result-tab">
      {loading ? (
        <div className="result-loading" data-testid="loading"></div>
      ) : error !== "" ? (
        <div className="result-error">
          <h1>Error!</h1>
          <h4>{error}</h4>
        </div>
      ) : (
        <>
          <p>
            User:
            <span className="result-tab__span" data-testid="user-id">
              {userData.user}
            </span>
          </p>

          <p>
            Total Reward Points:
            <span className="result-tab__span" data-testid="total-reward">
              {userData.totalRewardPoints}
            </span>
          </p>
          <button
            className="result-tab__button"
            onClick={() => setShowTable(!showTable)}
            data-testid="show-table"
          >
            {showTable ? "Hide" : "Show"} Full Transaction History
          </button>

          {userData.transactionList.length === 0 && showTable ? (
            <h1>No available transactions at this time.</h1>
          ) : (
            <table
              className={`transaction-table ${showTable ? "" : "hidden"}`}
              data-testid="transaction-table"
            >
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Transaction time</th>
                  <th>Cost</th>
                  <th>Reward points earned</th>
                </tr>
              </thead>
              <tbody>
                {userData.transactionList.map((transaction) => {
                  let transactionTime = new Date(transaction.transactionTime);
                  transactionTime = transactionTime.toLocaleString();
                  return (
                    <tr key={transaction.transactionId}>
                      <td>{transaction.transactionId}</td>
                      <td>{transactionTime}</td>
                      <td> {transaction.cost}</td>
                      <td>{transaction.reward}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
