import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouterPath } from "../../../assets/dictionary/RouterPath";

export default function ToDo(props) {
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);

  //   const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center pt-5 ">
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>List to do</Card.Title>
                <Card.Text>Check your email to confirm it.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
