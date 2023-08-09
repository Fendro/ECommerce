import React from "react";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";
import AdminForm from "../components/form/AdminForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;
export default function admin() {
  return (
    <>
      <Header />
      <AdminForm />
      <GlobalStyle />
    </>
  );
}
