import { useState, useEffect } from "react";

import api from "../utils/api";

const useFanficChapters = (id, status) => {
  const [fanficChapters, setfanficChapters] = useState([]);
  useEffect(() => {
    let cleanupFunction = false;
    const fetchFanficChapters = async () => {
      try {
        if (status === "success") {
          const response = await api.get(`/fanfic/${id}/chapters`);
          if (!cleanupFunction) {
            setfanficChapters(response.data.chapters);
          };
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFanficChapters();
    return () => cleanupFunction = true;
  }, [id, status]);
  return fanficChapters;
};

export default useFanficChapters;