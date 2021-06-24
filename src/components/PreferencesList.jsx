import { useState, useCallback } from "react";
import { Button } from "react-bootstrap";

import Preference from "./Preference"

const PreferencesList = ({ fandoms, onSetPreferences }) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleTogglePreference = fandomId => {
    if (selectedPreferences.includes(fandomId)) {
      setSelectedPreferences(selectedPreferences.filter(preference => {
        return preference !== fandomId;
      }));
    } else {
      setSelectedPreferences([...selectedPreferences, fandomId]);
    }
  };

  const handleSavePreferences = () => {
    onSetPreferences(selectedPreferences);
  };

  const handleSkipPreferences = useCallback(() => {
    onSetPreferences([]);
  }, [onSetPreferences]);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between mb-5">
        {fandoms.map(fandom => {
          return (
            <Preference
              key={fandom._id}
              fandomId={fandom._id}
              fandomName={fandom.name}
              selected={selectedPreferences.includes(fandom._id)}
              onTogglePreference={handleTogglePreference}
            />
          );
        })}
      </div>
      <div className="d-flex justify-content-center">
        <Button onClick={handleSavePreferences} className="mx-3" variant="primary">Save</Button>
        <Button onClick={handleSkipPreferences} className="mx-3" variant="secondary">Skip</Button>
      </div>
    </div>
  );
};

export default PreferencesList;