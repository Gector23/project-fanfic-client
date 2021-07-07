import { Card } from "react-bootstrap";

const ProfileCard = ({ profileData }) => {
  return (
    <Card className="mb-5">
      <Card.Body>
        <p>Login: {profileData.login}</p>
        <p>Admin: {String(profileData.isAdmin)}</p>
        <p className="mb-0">Sign Up: {new Date(profileData.signUp).toLocaleString()}</p>
      </Card.Body>
      <Card.Footer> Last sign in: {new Date(profileData.lastSignIn).toLocaleString()}</Card.Footer>
    </Card>
  );
};

export default ProfileCard;