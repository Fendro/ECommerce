import React from "react";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";
import AddArticleForm from "../components/form/AddArticleForm";

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
      <AddArticleForm />
      <GlobalStyle />
    </>
  );
}
