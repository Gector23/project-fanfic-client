import { useState, useEffect } from "react";
import queryString from "query-string";

import api from "../utils/api";

const useUserFanfics = (id, fanficsType, sort, currentPage, fandom, fanficsStateHash) => {
  const [userFanfics, setUserFanfics] = useState({data: []});
  useEffect(() => {
    let cleanupFunction = false;
    const fetchUserFanfics = async () => {
      try {
        const query = queryString.stringify({
          sortField: sort.sortField,
          sortDirection: sort.direction ? "down" : "up",
          pageSize: 5,
          currentPage,
          fandom
        });
        const response = await api.get(`/user/${id}/${fanficsType}?${query}`);
        if (!cleanupFunction) {
          setUserFanfics(response.data);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserFanfics();
    return () => cleanupFunction = true;
  }, [id, fanficsType, sort, currentPage, fandom, fanficsStateHash]);
  return userFanfics;
};

export default useUserFanfics;