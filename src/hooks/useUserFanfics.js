import { useState, useEffect } from "react";

import api from "../utils/api";

const useUserFanfics = (id, fanficsType) => {
  const [userFanfics, setUserFanfics] = useState([]);
  useEffect(() => {
    let cleanupFunction = false;
    const fetchUserFanfics = async () => {
      try {
        const response = await api.get(`/user/${id}/${fanficsType}`);
        if (!cleanupFunction) {
          setUserFanfics(response.data[fanficsType]);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserFanfics();
    return () => cleanupFunction = true;
  }, [id, fanficsType]);
  return userFanfics;
};

export default useUserFanfics;