import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RouterPath } from "../../assets/dictionary/RouterPath";

export default function LinkNotValid(props) {
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);

  //   const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center pt-5 ">
          <Col xs={4}>
            <Card>
              <Card.Body>
                <Card.Title>Link is not valid :(</Card.Title>
                <Card.Text>
                  Sorry, but the link you used is not valid.
                </Card.Text>
                <Link to={RouterPath.HOME}>
                  <Button variant="primary" type="submit" className="w-100">
                    Back to home page
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
