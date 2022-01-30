// import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import NavBarTop from "./components/nav_bar/NavBarTop";
import HomePage from "./pages/home_page/HomePage";
import SignUpForm from "./pages/sign_up/sign_up_form/SignUpForm";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBarTop />
      <Outlet />
    </>
  );
}

export default App;
