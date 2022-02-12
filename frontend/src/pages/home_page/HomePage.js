import { Container, Row, Col, Card } from "react-bootstrap";

export default function HomePage(props) {
  return (
    <>
      <Container>
        <Row className="justify-content-center pt-5 ">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} >
            <Card>
              <Card.Body>
              <Card.Title>Welcome to Awesome ToDOo!</Card.Title>
                <Card.Text className="pt-2">This web application was made with :
                <ul>
                  <li>ReactJS (JavaScript)</li>
                  <li>FastAPI (Python)</li>
                  <li>Bootstrap</li>
                  <li>SQLite</li>
                  <li>And other great technologies</li>
                </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
