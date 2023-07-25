import React from 'react';
import Header from '../components/header';
import {createGlobalStyle} from 'styled-components';
import RegistrationForm from "../components/register/registrationForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;


function Register() {
    return (
        <>
            <Header/>
            <RegistrationForm/>
            <GlobalStyle/>
        </>
    )
}

export default Register;