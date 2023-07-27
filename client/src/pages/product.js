import React from 'react';
import Header from '../components/header';
import { createGlobalStyle } from 'styled-components';
import ProductForm from "../components/form/productForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;

function Product() {
	return (
		<>
			<Header />
			<ProductForm />
			<GlobalStyle />
		</>
	)
}

export default Product;