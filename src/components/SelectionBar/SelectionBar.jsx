import React, { useState } from "react";

import { getCustomerTransactions, getCustomerList } from "../../mockAPI/API";
import TimePicker from "../TimePicker/TimePicker";
import DataTable from "../DataTable/DataTable";
import CheckBox from "../CheckBox/CheckBox";

import useFetch from "../../hooks/useFetch";

import "./SelectionBar.css";

export const defaultMethods = {
  get_all_transactions: "get-all-transactions",
  get_transactions_by_given_time: "get-transactions-by-given-time",
  get_transactions_by_month: "get-transactions-by-month",
};

export const timePickerTypes = {
  date: "date",
  month: "month",
};

const defaultUserInfo = {
  user: "",
  startTime: "",
  endTime: "",
  month: "",
  method: "",
};

export default function SelectionBar() {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [showResult, setShowResult] = useState(false);

  const { loading, data, error, fetchData } = useFetch(getCustomerTransactions);

  const handleGet = async () => {
    if (!formValidation()) return;
    setShowResult(true);
    await fetchData(userInfo.user, userInfo.startTime, userInfo.endTime);
  };

  const formValidation = () => {
    if (userInfo.user === "") {
      alert("Please input a user ID first!");
      return false;
    }
    if (userInfo.method === "") {
      alert("Please provide a method!");
      return false;
    }
    if (
      userInfo.method === defaultMethods.get_transactions_by_given_time &&
      (userInfo.startTime === "" || userInfo.endTime === "")
    ) {
      alert("Please provide all time!");
      return false;
    }
    if (new Date(userInfo.startTime) > new Date(userInfo.endTime)) {
      alert("Please provide available time period!");
      return false;
    }
    return true;
  };

  const handleSelectMethod = (e) => {
    setUserInfo({
      ...userInfo,
      method: e.target.name,
      startTime: "",
      endTime: "",
    });
  };

  const handleMonth = (e) => {
    setUserInfo((prev) => {
      return { ...prev, month: e.target.value };
    });
    const date = e.target.value.split("-");
    const daysInMonth = new Date(date[0], date[1], 0).getDate();
    setUserInfo((prev) => {
      return {
        ...prev,
        startTime: e.target.value + "-01",
        endTime: e.target.value + "-" + daysInMonth,
      };
    });
  };

  const handleClear = () => {
    setUserInfo(defaultUserInfo);
    setShowResult(false);
  };

  return (
    <>
      <div className="selection-bar">
        <div className="selection-bar__input">
          <label>
            Input userID:{" "}
            <input
              name="user"
              value={userInfo.user}
              onChange={(e) =>
                setUserInfo({ ...userInfo, user: e.target.value })
              }
            />
          </label>
        </div>

        <CheckBox
          name={defaultMethods.get_all_transactions}
          label={"Get all reward points"}
          onChange={handleSelectMethod}
          checked={userInfo.method === defaultMethods.get_all_transactions}
        />

        <CheckBox
          name={defaultMethods.get_transactions_by_given_time}
          label={"Get reward points in a given time period"}
          onChange={handleSelectMethod}
          checked={
            userInfo.method === defaultMethods.get_transactions_by_given_time
          }
        >
          <TimePicker
            type={timePickerTypes.date}
            label={"Start date:"}
            value={userInfo.startTime}
            onChange={(e) =>
              setUserInfo({ ...userInfo, startTime: e.target.value })
            }
            disabled={
              userInfo.method !== defaultMethods.get_transactions_by_given_time
            }
          />
          <TimePicker
            type={timePickerTypes.date}
            label={"End date:"}
            value={userInfo.endTime}
            onChange={(e) =>
              setUserInfo({ ...userInfo, endTime: e.target.value })
            }
            disabled={
              userInfo.method !== defaultMethods.get_transactions_by_given_time
            }
          />
        </CheckBox>

        <CheckBox
          name={defaultMethods.get_transactions_by_month}
          label={"Get transactions in a month"}
          onChange={handleSelectMethod}
          checked={userInfo.method === defaultMethods.get_transactions_by_month}
        >
          <TimePicker
            type={timePickerTypes.month}
            label={"Select month:"}
            value={userInfo.month}
            onChange={handleMonth}
            disabled={
              userInfo.method !== defaultMethods.get_transactions_by_month
            }
          />
        </CheckBox>

        <button onClick={handleGet} className="selection-bar__get-button">
          GET RESULT
        </button>
        <button onClick={handleClear} className="selection-bar__clear-button">
          CLEAR
        </button>
      </div>

      {showResult ? (
        <DataTable
          user={userInfo.user}
          userData={data}
          loading={loading}
          error={error}
        />
      ) : null}
    </>
  );
}
