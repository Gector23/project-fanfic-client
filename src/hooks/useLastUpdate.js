import { useState, useEffect } from "react";

import api from "../utils/api";

const useLastUpdate = (path, id) => {
  const [lastUpdate, setLastUpdate] = useState(null);
  useEffect(() => {
    let cleanupFunction = false;
    const fetchLastUpdate = async () => {
      try {
        if (path && id) {
          const response = await api.get(`/${path}/${id}/last-update`);
          if (!cleanupFunction) {
            setLastUpdate(response.data.lastUpdate);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLastUpdate();
    return () => cleanupFunction = true;
  }, [path, id]);
  return lastUpdate;
};

export default useLastUpdate;