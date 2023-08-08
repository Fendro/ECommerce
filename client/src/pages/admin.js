import React from 'react';
import Header from '../components/header';
import {createGlobalStyle} from 'styled-components';
import AdminForm from '../components/form/adminForm';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;
export default function admin() {
    return (<>
        <Header/>
        <AdminForm/>
        <GlobalStyle/>
    </>)
}