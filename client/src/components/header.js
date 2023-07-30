import React, { useContext } from 'react';
import Logo from './asset/logo.png';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { EmailContext } from '../context/EmailContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const handleAdminClick = () => {
        navigate('/admin');
    };
    const handleChangeClick = () =>{
        navigate('/change');
    }
    const handleLogoutClick = () => {
        window.location.replace("/");
    }
    const handleProductClick = () => {
        navigate('/articles');
    }
    const { admin, setAdmin } = useContext(UserContext);
    const { email, setEmail } = useContext(EmailContext);
    const navigate = useNavigate();
    if (admin === true) {
        return (
            <HeaderContainer>
                <LogoImage src={Logo} alt="#" />
                <h1>ADMIN</h1>
                <Navbar>
                    <NavItem onClick={handleAdminClick}>Admin</NavItem>
                    <NavItem onClick={handleChangeClick}>Change</NavItem>
                    <NavItem onClick={handleProductClick}>Products</NavItem>
                    <NavItem onClick={handleLogoutClick}>Logout</NavItem>
                </Navbar>
            </HeaderContainer>
        );
    } else if(admin === false) {
        return (
            <HeaderContainer>
                <LogoImage src={Logo} alt="#" />
                <Navbar>
                    <NavItem>Link 1</NavItem>
                    <NavItem>Link 2</NavItem>
                    <NavItem>Link 3</NavItem>
                </Navbar>
            </HeaderContainer>
        );
    }else{
        return (
            <HeaderContainer>
                <LogoImage src={Logo} alt="#" />
            </HeaderContainer>
        );
    }
}

export default Header;

// Styled Components
const HeaderContainer = styled.div`
  background-color: darkorange;
  padding: 5px;
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: space-between; /* Размещение элементов по краям контейнера */
`;

const LogoImage = styled.img`
  width: 125px;
  height: auto;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  padding: 8px 16px;
  margin: 0 4px;
  background-color: black;
  border-radius: 4px;
  cursor: pointer;
`;
