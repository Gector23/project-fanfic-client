import { useState, useEffect } from "react";

import api from "../utils/api";

const useUserFanfics = (id, fanficsType) => {
  const [userFanfics, setUserFanfics] = useState([]);
  useEffect(() => {
    const fetchUserFanfics = async () => {
      try {
        const response = await api.get(`/user/${id}/${fanficsType}`);
        setUserFanfics(response.data[fanficsType]);
      } catch (err) {
        setUserFanfics([]);
      }
    };
    fetchUserFanfics();
  }, [id, fanficsType]);
  return userFanfics;
};

export default useUserFanfics;