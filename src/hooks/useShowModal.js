import { useState, useCallback } from "react";

const useShowModal = () => {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  return [show, showModal, hideModal];
};

export default useShowModal;