import { useState, useEffect } from "react";
import queryString from "query-string";

import api from "../utils/api";

const useFetchProfiles = (currentPage,  profilesStateHash) => {
  const [profiles, setProfiles] = useState({data: []});
  useEffect(() => {
    let cleanupFunction = false;
    const fetchProfiles = async () => {
      try {
        const query = queryString.stringify({
          pageSize: 5,
          currentPage
        });
        const response = await api.get(`/user?${query}`);
        if (!cleanupFunction) {
          setProfiles(response.data);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfiles();
    return () => cleanupFunction = true;
  }, [currentPage, profilesStateHash]);
  return profiles;
};

export default useFetchProfiles;