import { useState, useEffect } from "react";

import api from "../utils/api";

const useTags = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tag");
        setTags(response.data.tags);
      } catch (err) {
        setTags([]);
      }
    };
    fetchTags();
  }, []);
  return tags;
};

export default useTags;