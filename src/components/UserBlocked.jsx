import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { signOut } from "../actions/user";

const UserBlocked = () => {
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(signOut(), { shouldHandleLoadingState: true });
  }, [dispatch]);

  return (
    <div className="text-center">
      <h4>You are blocked!</h4>
      <p>
        <button className="btn btn-link" onClick={handleSignOut}>Sign Out</button>
      </p>
    </div>
  );
};

export default UserBlocked;