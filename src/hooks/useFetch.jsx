import { useState } from "react";

export default function useFetch(fetcher) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async (...args) => {
    setLoading(true);
    fetcher(...args)
      .then((res) => {
        setData(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return { loading, data, error, fetchData };
}
