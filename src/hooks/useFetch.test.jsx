import React from "react";
import { renderHook, act } from "@testing-library/react";
import useFetch from "./useFetch";

describe("useFetch", () => {
  it("should return data, loading and error correctly", async () => {
    const callback = jest.fn(() => Promise.resolve({ data: "test data" }));

    const { result, rerender } = renderHook(() => useFetch(callback));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("");

    await act(async () => {
      result.current.fetchData();
    });
    rerender();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ data: "test data" });
    expect(result.current.error).toBe("");
  });

  it("should set error message when callback fails", async () => {
    const err = "Something went wrong";
    const callback = jest.fn(() => Promise.reject(err));

    const { result, rerender } = renderHook(() => useFetch(callback));

    await act(async () => {
      result.current.fetchData();
    });
    rerender();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(err);
  });
});
