import { useState, useEffect } from "react";
import queryString from "query-string";

import api from "../utils/api";

const useCommunityFanfics = (sortField, currentPage, preferences, fanficsStateHash) => {
  const [communityFanfics, setCommunityFanfics] = useState({data: []});
  useEffect(() => {
    let cleanupFunction = false;
    const fetchCommunityFanfics = async () => {
      try {
        const query = queryString.stringify({
          sortField,
          pageSize: 5,
          currentPage,
          preferences
        });
        const response = await api.get(`/fanfic?${query}`);
        if (!cleanupFunction) {
          setCommunityFanfics(response.data);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommunityFanfics();
    return () => cleanupFunction = true;
  }, [sortField, currentPage, preferences, fanficsStateHash]);
  return communityFanfics;
};

export default useCommunityFanfics;