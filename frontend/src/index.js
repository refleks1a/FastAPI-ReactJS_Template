import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render } from "react-dom";

// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterPath } from "./assets/dictionary/RouterPath";

import App from "./App";
import NavBarTop from "./components/nav_bar/NavBarTop";
import HomePage from "./pages/home_page/HomePage";
import SignUpForm from "./pages/sign_up/sign_up_form/SignUpForm";
import ConfirmationEmailSent from "./pages/sign_up/confirmation_email_sent/ConfirmationEmailSent";
import ToDo from "./pages/dashboard/todos/ToDo";
import Profil from "./pages/dashboard/profil/Profil";
import ToDoDone from "./pages/dashboard/todos_done/ToDoDone";
import ForgotPasswordForm from "./pages/forgot_password/forgot_password_form/ForgotPasswordForm";
import ForgotPasswordEmailSent from "./pages/forgot_password/forgot_password_email_sent/ForgotPasswordEmailSent";
import ResetPasswordForm from "./pages/forgot_password/reset_password/ResetPassword";
import PasswordChanged from "./pages/forgot_password/password_changed/PasswordChanged";
import LinkNotValid from "./pages/link_not_valid/LinkNotValid";
import ConfirmEmail from "./pages/sign_up/confirm_email/ConfirmEmail";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route exact path={RouterPath.HOME} element={<HomePage />}></Route>
      <Route path={RouterPath.HOME} element={<App />}>
        <Route path={RouterPath.SIGNUP} element={<SignUpForm />} />
        <Route
          path={RouterPath.SIGNUP_MAIL_SENT}
          element={<ConfirmationEmailSent />}
        />
        <Route
          path={RouterPath.SIGNUP_CONFIRM_EMAIL}
          element={<ConfirmEmail />}
        />
        <Route
          path={RouterPath.FORGOT_PASSWORD}
          element={<ForgotPasswordForm />}
        />
        <Route
          path={RouterPath.FORGOT_PASSWORD_MAIL_SENT}
          element={<ForgotPasswordEmailSent />}
        />
        <Route
          path={RouterPath.RESET_PASSWORD}
          element={<ResetPasswordForm />}
        />
        <Route
          path={RouterPath.PASSWORD_CHANGED}
          element={<PasswordChanged />}
        />

        <Route path={RouterPath.LINK_NOT_VALID} element={<LinkNotValid />} />

        <Route path={RouterPath.LIST_TODOS} element={<ToDo />} />
        <Route path={RouterPath.LIST_DONE} element={<ToDoDone />} />
        <Route path={RouterPath.MY_INFORMATION} element={<Profil />} />
        <Route path="*" element={<LinkNotValid />} />
      </Route>
    </Routes>
  </BrowserRouter>,

  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
