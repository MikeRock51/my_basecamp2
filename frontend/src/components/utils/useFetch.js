import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://basecamp.mikerock.tech/api/v1${url}`);
        setData(response.data);
      } catch (error) {
        setError(error.response?.data?.Error || "An error occurred");
      }
    }
    fetchData();
  }, [url]);
  return { data, error };
}

export default useFetch;
