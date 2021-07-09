import { useState, useEffect } from "react";

import api from "../utils/api";

const useFandoms = () => {
  const [fandoms, setFandoms] = useState([]);
  useEffect(() => {
    let cleanupFunction = false;
    const fetchFandoms = async () => {
      try {
        const response = await api.get("/fandom");
        if (!cleanupFunction) {
          setFandoms(response.data.fandoms);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchFandoms();
    return () => cleanupFunction = true;
  }, []);
  return fandoms;
};

export default useFandoms;