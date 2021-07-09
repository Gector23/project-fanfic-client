import { useState, useEffect } from "react";

import api from "../utils/api";

const useActivateUser = activationLink => {
  const [activation, setActivation] = useState({ status: "fetch" });
  useEffect(() => {
    let cleanupFunction = false;
    const fetchActivation = async () => {
      try {
        const response = await api.get("/auth/activate", {
          params: { activationLink }
        });
        if (!cleanupFunction) {
          setActivation({ status: "success", message: response.data.message });
        };
      } catch (err) {
        if (!cleanupFunction) {
          setActivation({ status: "failure", message: err.response.data.message });
        };
      }
    };
    fetchActivation();
    return () => cleanupFunction = true;
  }, [activationLink]);
  return activation;
};

export default useActivateUser;