import { useSelector } from "react-redux";

const useRelation = id => {
  const user = useSelector(state => state.user);

  const isSignedIn = user?.status === "success";
  const isOwner = isSignedIn && user.data._id === id;
  const isAdmin = isSignedIn && user.data.isAdmin;
  const hasAccess = isSignedIn && (isOwner || isAdmin);

  return {isSignedIn, isOwner, isAdmin, hasAccess};
};

export default useRelation;