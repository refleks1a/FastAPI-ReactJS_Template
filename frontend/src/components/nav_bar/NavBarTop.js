import { Button, Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { RouterPath } from "../../assets/dictionary/RouterPath";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBarTop(props) {
  const [isLogged, setisLogged] = useState(false);

  let token = "";

  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }, []);

  return (
    <>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Row className="w-100 justify-content-between">
                  <Col xs={8} className="d-flex">
                    <LinkContainer to={RouterPath.HOME}>
                      <Navbar.Brand>Awesome ToDOo</Navbar.Brand>
                    </LinkContainer>
                    <div className={isLogged ? "" : "d-none"}>
                      <Nav className="me-auto">
                        <LinkContainer to={RouterPath.LIST_TODOS}>
                          <Nav.Link>List To do</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={RouterPath.LIST_DONE}>
                          <Nav.Link>List done</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={RouterPath.MY_INFORMATION}>
                          <Nav.Link>My information</Nav.Link>
                        </LinkContainer>
                      </Nav>
                    </div>
                  </Col>
                  <Col xs={1} className="align-items-end">
                    <Link to={RouterPath.SIGNUP}>
                      <Button>Sign up</Button>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </>
  );
}
