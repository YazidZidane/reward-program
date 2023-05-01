import React, { useEffect, useState } from "react";

import SearchResult from "../SearchResult/SearchResult";
import useFetch from "../../hooks/useFetch";
import CalculateReward from "../../utils/CalculateReward";
import { getUserList, getCustomerTransactions } from "../../mockAPI/API";

import "../../styles/SearchRewardsAndTransactions.css";

const defaultUserSearchParams = {
  user: "",
  startTime: "",
  endTime: "",
};

const defaultSearchResult = {
  user: "",
  totalRewardPoints: 0,
  transactionList: [],
};

export default function SearchRewardsAndTransactions() {
  const [userList, setUserList] = useState([]);
  const [userSearchParams, setUserSearchParams] = useState(
    defaultUserSearchParams
  );
  const [searchResult, setSearchResult] = useState(defaultSearchResult);
  const [showResult, setShowResult] = useState(false);

  const {
    loading,
    data: transactionData,
    error,
    fetchData: fetchTransactionData,
  } = useFetch(getCustomerTransactions);

  const handleSearchTransaction = async () => {
    if (!formValidation()) return;
    setShowResult(true);
    await fetchTransactionData(
      userSearchParams.user,
      userSearchParams.startTime,
      userSearchParams.endTime
    );
  };

  useEffect(() => {
    const getFullUserList = async () => {
      const fullUserList = await getUserList();
      setUserList(fullUserList);
    };
    getFullUserList();
  }, []);

  useEffect(() => {
    const { totalRewards, recordsWithRewards } =
      CalculateReward(transactionData);
    setSearchResult({
      user: userSearchParams.user,
      totalRewardPoints: totalRewards,
      transactionList: recordsWithRewards,
    });
  }, [transactionData]);

  const formValidation = () => {
    if (userSearchParams.user === "") {
      alert("Please select a user ID first!");
      return false;
    }
    if (
      (userSearchParams.startTime === "" || userSearchParams.endTime === "") &&
      !(userSearchParams.startTime === "" && userSearchParams.endTime === "")
    ) {
      alert("Please provide all time!");
      return false;
    }
    if (
      new Date(userSearchParams.startTime) > new Date(userSearchParams.endTime)
    ) {
      alert("Please provide available time period!");
      return false;
    }
    return true;
  };

  const handleClearFields = () => {
    setUserSearchParams(defaultUserSearchParams);
    setShowResult(false);
  };

  return (
    <>
      <div className="selection-bar">
        <div className="selection-bar__input">
          <label>
            Input User ID:{" "}
            <select
              type="select"
              value={userSearchParams.user}
              onChange={(e) =>
                setUserSearchParams({
                  ...userSearchParams,
                  user: e.target.value,
                })
              }
            >
              <option value={""} key={"user"}></option>
              {userList.map((user) => {
                return (
                  <option value={user} key={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="selection-bar__time-input">
            <label>
              {"Search reward points and transactions for this user from "}
              <input
                type={"date"}
                value={userSearchParams.startTime}
                onChange={(e) =>
                  setUserSearchParams({
                    ...userSearchParams,
                    startTime: e.target.value,
                  })
                }
              />
            </label>

            <label>
              {" to "}
              <input
                type={"date"}
                value={userSearchParams.endTime}
                onChange={(e) =>
                  setUserSearchParams({
                    ...userSearchParams,
                    endTime: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </div>

        <div className="selection-bar__buttons">
          <button
            onClick={handleSearchTransaction}
            className="selection-bar__get-button"
          >
            GET RESULT
          </button>
          <button
            onClick={handleClearFields}
            className="selection-bar__clear-button"
          >
            CLEAR
          </button>
        </div>
      </div>

      {showResult ? (
        <SearchResult userData={searchResult} loading={loading} error={error} />
      ) : null}
    </>
  );
}
