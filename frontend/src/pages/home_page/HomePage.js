import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { RouterPath } from "../../assets/dictionary/RouterPath"
import myAppConfig from "../../config";

export default function HomePage(props) {
  return (
    <>
      <Container>
        <Row className="justify-content-center pt-5 ">
          <Col xs={12} sm={12} md={10} lg={8} xl={6}>
            <Card>
            <Card.Header as="h5">Template</Card.Header>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
