import { useSelector, useDispatch } from "react-redux";

import { setPreferences } from "../actions/user";

import PreferencesList from "../components/PreferencesList";

const InitializePreferences = () => {
  const fandoms = useSelector(state => state.fandoms);
  const userId = useSelector(state => state.user.data._id);
  const dispatch = useDispatch();

  const handleSetPreferences = preferences => {
    dispatch(setPreferences(userId, preferences));
  };

  return (
    <div>
      <h4 className="text-center mb-5">Select your preferences from the fandoms</h4>
      <PreferencesList fandoms={fandoms} onSetPreferences={handleSetPreferences} />
    </div>
  );
};

export default InitializePreferences;