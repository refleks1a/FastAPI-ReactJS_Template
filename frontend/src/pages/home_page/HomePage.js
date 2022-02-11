import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import DataService from "./HomePageService";
import { RouterPath } from "../../assets/dictionary/RouterPath";

export default function HomePage(props) {
  const [isShowValidationError, setisShowValidationError] = useState(false);
  const [isSendingRequest, setisSendingRequest] = useState(false);

  const [EmailForm, setEmailForm] = useState("");
  const [PasswordForm, setPasswordForm] = useState("");

  let navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") ? true : false;


  const handleClick = (e) => {
    setisSendingRequest(true);

    e.preventDefault();

    if (
      !PasswordForm ||
      !String(EmailForm)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setisShowValidationError(true);
      setisSendingRequest(false);
    } else {
      var bodyFormData = new FormData();
      bodyFormData.append("username", EmailForm.toLowerCase());
      bodyFormData.append("password", PasswordForm);

      DataService.postLogin(bodyFormData)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.access_token);
            navigate(RouterPath.LIST_TODOS);
          } else {
            setisSendingRequest(false);
            setisShowValidationError(true);
          }
        })
        .catch((error) => {
          setisSendingRequest(false);
          setisShowValidationError(true);
        });
    }
  };

  return (
    <>
      {/* <NavBarTop /> */}
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
