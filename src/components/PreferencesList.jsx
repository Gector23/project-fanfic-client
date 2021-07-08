import Preference from "./Preference"

const PreferencesList = ({ fandoms, selectedPreferences, onTogglePreference }) => {
  return (
      <div className="d-flex flex-wrap justify-content-between mb-5">
        {fandoms.map(fandom => {
          return (
            <Preference
              key={fandom._id}
              fandomId={fandom._id}
              fandomName={fandom.name}
              selected={selectedPreferences.includes(fandom._id)}
              onTogglePreference={onTogglePreference}
            />
          );
        })}
      </div>
  );
};

export default PreferencesList;