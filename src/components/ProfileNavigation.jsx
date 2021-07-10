import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

const ProfileNavigation = ({ editAccess }) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const activeLink = useLocation().pathname.split("/")[3];

  return (
    <Nav className="mb-5" variant="tabs">
      <Nav.Item>
        <Nav.Link
          eventKey="fanfics"
          active={activeLink === "fanfics"}
          onClick={() => history.push(`${url}/fanfics`)}
        >
          Fanfics
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="favorites"
          active={activeLink === "favorites"}
          onClick={() => history.push(`${url}/favorites`)}
        >
          Favorites
        </Nav.Link>
      </Nav.Item>
      {editAccess && (
        <Nav.Item>
          <Nav.Link
            eventKey="edit"
            active={activeLink === "edit"}
            onClick={() => history.push(`${url}/edit`)}
          >
            Edit
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default ProfileNavigation;