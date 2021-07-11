import { Card } from "react-bootstrap";

import Fandom from "./Fandom";

const ProfileCard = ({ profileData, buttons }) => {
  return (
    <Card className="mb-5">
      {buttons.length !== 0 && (
        <Card.Header>
          <div className="d-flex justify-content-end">
            {buttons}
          </div>
        </Card.Header>
      )}
      <Card.Body>
        <div className="mb-1">Login: {profileData.login}</div>
        <div className="mb-1">Admin: {String(profileData.isAdmin)}</div>
        <div className="mb-1">Preferences: {profileData.preferences.map(fandom => (
          <Fandom key={fandom._id} fandom={fandom.name} />
        ))}</div>
        <div>Sign In: {new Date(profileData.lastSignIn).toLocaleString()}</div>
        <div>Sign Up: {new Date(profileData.signUp).toLocaleString()}</div>
      </Card.Body>
      <Card.Footer> Last update: {new Date(profileData.lastUpdate).toLocaleString()}</Card.Footer>
    </Card>
  );
};

export default ProfileCard;