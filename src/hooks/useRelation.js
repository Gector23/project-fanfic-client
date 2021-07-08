import { useSelector } from "react-redux";

const useRelation = id => {
  const isSignedIn = useSelector(state => state.user.status === "success");
  const isOwner = useSelector(state => state.user.data?._id === id);
  const hasAccess = useSelector(state => (isOwner || state.user.data?.isAdmin) ? true : false);
  return {isSignedIn, isOwner, hasAccess};
};

export default useRelation;