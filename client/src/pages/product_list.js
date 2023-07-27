import React from 'react';
import Header from '../components/header';
import { createGlobalStyle } from 'styled-components';
import ProductListForm from "../components/form/productListForm";

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
			<ProductListForm />
			<GlobalStyle />
		</>
	)
}

export default Article;