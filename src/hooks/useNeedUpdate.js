import { useState, useEffect } from "react";

import api from "../utils/api";

const useNeedUpdate = (path, id, lastUpdate) => {
  const [needUpdate, setNeedUpdate] = useState(false);
  useEffect(() => {
    const fetchLastUpdate = async () => {
      try {
        if (id && lastUpdate) {
          const response = await api.get(`/${path}/${id}/last-update`);
          if (lastUpdate !== response.data.lastUpdate) {
            setNeedUpdate(true);
          }
        }
      } catch (err) {
        setNeedUpdate(false);
      }
    };
    fetchLastUpdate();
  }, [path, id, lastUpdate]);
  return needUpdate;
};

export default useNeedUpdate;