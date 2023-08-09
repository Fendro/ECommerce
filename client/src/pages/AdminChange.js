import React from "react";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";
import AdminChangeForm from "../components/form/AdminChangeForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;
export default function adminChange() {
  return (
    <>
      <Header />
      <AdminChangeForm />
      <GlobalStyle />
    </>
  );
}
