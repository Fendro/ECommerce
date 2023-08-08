import React from 'react';
import Header from '../components/header';
import {createGlobalStyle} from 'styled-components';
import ArticleForm from "../components/form/articleForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;

export default function Article() {
    return (<>
        <Header/>
        <ArticleForm/>
        <GlobalStyle/>
    </>)
}