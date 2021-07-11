import { useState, useEffect } from "react";
import queryString from "query-string";

import api from "../utils/api";

const useFanficSearch = (currentPage, searchString) => {
  const [fanfics, setFanfics] = useState({data: []});
  useEffect(() => {
    let cleanupFunction = false;
    const fetchFanfics = async () => {
      try {
        const query = queryString.stringify({
          pageSize: 5,
          currentPage,
          searchString
        });
        const response = await api.get(`/fanfic/search?${query}`);
        if (!cleanupFunction) {
          setFanfics(response.data);
        };
      } catch (err) {
        console.log(err);
      }
    };
    if (currentPage && searchString) {
      fetchFanfics();
    }
    return () => cleanupFunction = true;
  }, [currentPage, searchString]);
  return fanfics;
};

export default useFanficSearch;