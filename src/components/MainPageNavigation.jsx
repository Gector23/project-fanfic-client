import { useHistory, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

const MainPageNavigation = ({ isSignedIn }) => {
  const history = useHistory();
  const activeLink = useLocation().pathname.split("/")[2];

  return (
    <Nav className="mb-5" variant="tabs">
      <Nav.Item>
        <Nav.Link
          eventKey="best-fanfics"
          active={activeLink === "best-fanfics"}
          onClick={() => history.push("/main/best-fanfics")}
        >
          Best fanfics
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="new-fanfics"
          active={activeLink === "new-fanfics"}
          onClick={() => history.push("/main/new-fanfics")}
        >
          New fanfics
        </Nav.Link>
      </Nav.Item>
      {isSignedIn && (
        <>
          <Nav.Item>
            <Nav.Link
              eventKey="best-from-preferences"
              active={activeLink === "best-from-preferences"}
              onClick={() => history.push("/main/best-from-preferences")}
            >
              Best from preferences
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="new-from-preferences"
              active={activeLink === "new-from-preferences"}
              onClick={() => history.push("/main/new-from-preferences")}
            >
              New from preferences
            </Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
};

export default MainPageNavigation;