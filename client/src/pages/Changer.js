import React from "react";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";
import ChangeForm from "../components/form/ChangeForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;
export default function changer() {
  return (
    <>
      <Header />
      <ChangeForm />
      <GlobalStyle />
    </>
  );
}
