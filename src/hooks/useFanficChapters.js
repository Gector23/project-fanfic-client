import { useState, useEffect } from "react";

import api from "../utils/api";

const useFanficChapters = (id, status) => {
  const [fanficChapters, setfanficChapters] = useState([]);
  useEffect(() => {
    const fetchFanficChapters = async () => {
      try {
        if (status === "success") {
          const response = await api.get(`/fanfic/${id}/chapters`);
          setfanficChapters(response.data.chapters);
        }
      } catch (err) {
        setfanficChapters([]);
      }
    };
    fetchFanficChapters();
  }, [id, status]);
  return fanficChapters;
};

export default useFanficChapters;