import React from "react";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";
import AddUserForm from "../components/form/AddUserForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;
export default function addUser() {
  return (
    <>
      <Header />
      <AddUserForm />
      <GlobalStyle />
    </>
  );
}
