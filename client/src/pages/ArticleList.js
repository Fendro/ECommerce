import React from "react";
import Header from "../components/Header";
import { createGlobalStyle } from "styled-components";
import ArticleListForm from "../components/form/ArticleListForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;

function Article() {
  return (
    <>
      <Header />
      <ArticleListForm />
      <GlobalStyle />
    </>
  );
}

export default Article;
