import { useState, useEffect } from "react";

import api from "../utils/api";

const useFandoms = () => {
  const [fandoms, setFandoms] = useState([]);
  useEffect(() => {
    const fetchFandoms = async () => {
      try {
        const response = await api.get("/fandom");
        setFandoms(response.data.fandoms);
      } catch (err) {
        setFandoms([]);
      }
    };
    fetchFandoms();
  }, []);
  return fandoms;
};

export default useFandoms;