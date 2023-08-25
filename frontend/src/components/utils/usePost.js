import axios from "axios";
import { useEffect, useState } from "react";

function usePost(url, formData) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/v1${url}`, formData);
        setData(response.data);
      } catch (error) {
        setError(error.response?.data?.Error || "An error occurred");
      }
    }
    postData();
  }, [url, formData]);
  return { data, error };
}

export default usePost;
