import { useState, useEffect } from "react";

import api from "../utils/api";

const useActivateUser = activationLink => {
  const [activation, setActivation] = useState({ status: "fetch" });
  useEffect(() => {
    const fetchActivation = async () => {
      try {
        const response = await api.get("/auth/activate", {
          params: { activationLink }
        });
        setActivation({ status: "success", message: response.data.message });
      } catch (err) {
        setActivation({ status: "failure", message: err.response.data.message });
      }
    };
    fetchActivation();
  }, [activationLink]);
  return activation;
};

export default useActivateUser;