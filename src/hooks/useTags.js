import { useState, useEffect } from "react";

import api from "../utils/api";

const useTags = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    let cleanupFunction = false;
    const fetchTags = async () => {
      try {
        const response = await api.get("/tag");
        if (!cleanupFunction) {
          setTags(response.data.tags);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchTags();
    return () => cleanupFunction = true;
  }, []);
  return tags;
};

export default useTags;