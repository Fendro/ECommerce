import React from 'react';
import {Container} from '@mui/material';
import Header from '../components/header';
import {styled} from '@mui/material/styles';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }
`;

function ErrorPage() {
    return (<>
        <Header/>
        <CenteredContainer>
            <h1>Page not found</h1>
        </CenteredContainer>
        <GlobalStyle/>
    </>)
}

export default ErrorPage;

const CenteredContainer = styled(Container)({
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
});