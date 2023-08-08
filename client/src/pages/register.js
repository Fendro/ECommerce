import React from 'react';
import Header from '../components/header';
import {createGlobalStyle} from 'styled-components';
import RegisterForm from "../components/form/registerForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;

function Register() {
    return (<>
        <Header/>
        <RegisterForm/>
        <GlobalStyle/>
    </>)
}

export default Register;