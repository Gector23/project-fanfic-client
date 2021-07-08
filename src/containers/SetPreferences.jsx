import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import useFandoms from "../hooks/useFandoms";

import { setPreferences } from "../actions/user";

import PreferencesList from "../components/PreferencesList";

const SetPreferences = ({ userId, initial = false, intialPreferences = [] }) => {
  const [selectedPreferences, setSelectedPreferences] = useState(intialPreferences.map(fandom => fandom._id));
  const fandoms = useFandoms();
  const dispatch = useDispatch();

  const handleTogglePreference = fandomId => {
    if (selectedPreferences.includes(fandomId)) {
      setSelectedPreferences(selectedPreferences.filter(preference => {
        return preference !== fandomId;
      }));
    } else {
      setSelectedPreferences([...selectedPreferences, fandomId]);
    }
  };

  const handleSetPreferences = preferences => {
    dispatch(setPreferences(userId, preferences, initial));
  };

  return (
    <div>
      <h4 className="text-center mb-5">Select your preferences from the fandoms</h4>
      <PreferencesList
        fandoms={fandoms}
        selectedPreferences={selectedPreferences}
        onTogglePreference={handleTogglePreference}
      />
      <div className="d-flex justify-content-center">
        <Button onClick={() => handleSetPreferences(selectedPreferences)} className="mx-3" variant="primary">Save</Button>
        {initial && <Button onClick={() => handleSetPreferences([])} className="mx-3" variant="secondary">Skip</Button>}
      </div>
    </div>
  );
};

export default SetPreferences;