import React from 'react';
import Logo from './asset/logo.png';
import styled from 'styled-components';


function Header() {
    return (
        <>
            <HeaderContainer>
                <LogoImage src={Logo} alt="#"/>
            </HeaderContainer>
        </>
    );
}

export default Header;

//Styled Components
const HeaderContainer = styled.div`
  background-color: darkorange;
  padding: 5px;
  display: flex;
  align-items: center;
  height: 100px;
`;

const LogoImage = styled.img`
  width: 125px;
  height: auto;
`;

