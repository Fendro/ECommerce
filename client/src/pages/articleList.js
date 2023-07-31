import React from 'react';
import Header from '../components/header';
import { createGlobalStyle } from 'styled-components';
import ArticleListForm from "../components/form/articleListForm";

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
	)
}

export default Article;