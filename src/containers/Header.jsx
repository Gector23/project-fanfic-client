import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Form, FormControl, Nav, NavDropdown, Button } from "react-bootstrap";

import { signOut } from "../actions/user";

const Header = () => {
  const history = useHistory();
  const userData = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  const handleProfile = useCallback(() => {
    history.push(`/profile/${userData._id}`);
  }, [history, userData]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut(), { shouldHandleLoadingState: true, process: "sign-out" });
  }, [dispatch]);

  return (
    <header>
      <Navbar className="mb-5" bg="light" expand="lg">
        <Navbar.Brand>Project Fanfic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="my-2 my-lg-0 mr-auto" inline>
            <FormControl className="mr-sm-2" type="text" placeholder="Search" />
            <Button className="my-2 my-sm-0" variant="outline-success" type="submite">Search</Button>
          </Form>
          <Nav>
            <Link className="nav-link" to="/main">Home</Link>
            {userData && userData.isAdmin && <Link className="nav-link" to="/admin">Admin</Link>}
            {
              userData ? (
                <NavDropdown title={userData.login} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/sign-in">Sign In</Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;