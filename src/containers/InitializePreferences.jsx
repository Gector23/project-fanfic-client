import { useSelector, useDispatch } from "react-redux";

import { setPreferences } from "../actions/common";

import PreferencesList from "../components/PreferencesList";

const InitializePreferences = () => {
  const fandoms = useSelector(state => state.fandoms);
  const dispatch = useDispatch();

  const handleSetPreferences = preferences => {
    dispatch(setPreferences(preferences));
  };

  return (
    <div>
      <h4 className="text-center mb-5">Select your preferences from the fandoms</h4>
      <PreferencesList fandoms={fandoms} onSetPreferences={handleSetPreferences} />
    </div>
  );
};

export default InitializePreferences;