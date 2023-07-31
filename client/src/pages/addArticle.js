import React from 'react';
import Header from '../components/header';
import { createGlobalStyle } from 'styled-components';
import AddProductForm from '../components/form/addProductForm';

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
            <AddProductForm />
            <GlobalStyle />
        </>
    )
}