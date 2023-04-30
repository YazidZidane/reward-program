import React, { useEffect, useState } from "react";
import "./DataTable.css";
import CalculateReward from "../../utils/CalculateReward";

const defaultUserInfo = {
  totalCost: null,
  totalReward: null,
};

export default function DataTable({ user, userData, loading, error }) {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const { totalCost, totalRewards } = CalculateReward(userData);
    setUserInfo({ totalCost: totalCost, totalReward: totalRewards });
    setShowTable(false);
  }, [userData]);

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
            User:<span className="result-tab__span">{user}</span>
          </p>
          <p>
            Total Cost:
            <span className="result-tab__span">{userInfo.totalCost}</span>
          </p>
          <p>
            Total Reward Points:
            <span className="result-tab__span">{userInfo.totalReward}</span>
          </p>
          <button
            className="result-tab__button"
            onClick={() => setShowTable(!showTable)}
            data-testid="show-table"
          >
            {showTable ? "Hide" : "Show"} Full Transaction History
          </button>

          {userData.length === 0 && showTable ? (
            <h1>No available transactions at this time.</h1>
          ) : (
            <table
              className={`transaction-table ${showTable ? "" : "hidden"}`}
              data-testid="transaction-table"
            >
              <thead>
                <tr>
                  <th>time</th>
                  <th>cost</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data) => {
                  return (
                    <tr key={data.transactionId}>
                      <td>{data.transactionTime}</td>
                      <td> {data.cost}</td>
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
