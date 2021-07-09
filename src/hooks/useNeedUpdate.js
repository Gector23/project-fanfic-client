import { useState, useEffect } from "react";

import api from "../utils/api";

const useNeedUpdate = (path, id, lastUpdate) => {
  const [needUpdate, setNeedUpdate] = useState(false);
  const [status, setStatus] = useState();
  useEffect(() => {
    let cleanupFunction = false;
    const fetchLastUpdate = async () => {
      try {
        if (id && lastUpdate && status === "success") {
          const response = await api.get(`/${path}/${id}/last-update`);
          setStatus("success");
          if (!cleanupFunction) {
            if (lastUpdate !== response.data.lastUpdate) {
              setNeedUpdate(true);
            } else {
              setNeedUpdate(false);
            }
          }
        }
      } catch (err) {
        console.log(err);
        setStatus("failur");
      }
    };
    fetchLastUpdate();
    setStatus("fetch");
    return () => cleanupFunction = true;
  }, [path, id, lastUpdate, status]);
  return needUpdate;
};

export default useNeedUpdate;