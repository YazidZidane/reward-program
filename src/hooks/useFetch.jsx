import { useState } from "react";

export default function useFetch(callback) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async (...args) => {
    setLoading(true);
    callback(...args)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return { loading, data, error, fetchData };
}
