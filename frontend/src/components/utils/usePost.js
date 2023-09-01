import axios from "axios";
import { useEffect, useState } from "react";

function usePost(url, formData) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post(`https://basecamp.mikerock.tech/api/v1${url}`, formData);
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
