import React from "react";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";
import LoginForm from "../components/form/LoginForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;

function Login() {
  return (
    <>
      <Header />
      <LoginForm />
      <GlobalStyle />
    </>
  );
}

export default Login;
