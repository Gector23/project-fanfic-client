import { useRouteMatch, useHistory } from "react-router-dom";
import { Nav } from "react-bootstrap";

const ProfileNavigation = () => {
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <Nav className="mb-5" variant="tabs" defaultActiveKey="fanfics">
      <Nav.Item>
        <Nav.Link eventKey="fanfics" onClick={() => history.push(`${url}/fanfics`)}>Fanfics</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="favorites" onClick={() => history.push(`${url}/favorites`)}>Favorites</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="edit" onClick={() => history.push(`${url}/edit`)}>Edit</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default ProfileNavigation;