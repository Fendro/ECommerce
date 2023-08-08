import React, {useContext, useEffect} from "react";
import Logo from "./asset/logo.png";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {serverURL} from "../utils/serverURL";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import axios from "axios";
import {TestContext} from "../context/TestContext";

function Header() {
    const {test, setTest} = useContext(TestContext);
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    }
    const handleAdminClick = () => {
        navigate('/admin');
    };
    const handleChangeClick = () => {
        navigate('/change');
    };
    const handleProductClick = () => {
        navigate('/articles');
    };
    const handleCartClick = () => {
        navigate('/cart');
    }

    const handleLogoutClick = async () => {
        try {
            const res = await fetch(serverURL("auth/logout"), {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, credentials: "include",
            });
            window.location.replace("/login");
        } catch (error) {
        }
    };
    useEffect(() => {
        if (Object.keys(test).length) return;

        axios.post(serverURL("auth/login"), {}, {withCredentials: true}).then((response) => {
            const {data} = response;

            if (data.success) {
                setTest(data.data);
            } else if (data.data) {
                setTest(data.data);
            }

            console.log(test);
        }).catch((error) => {
        });
    }, []);

    if (test.admin) {
        return (<HeaderContainer>
            <LogoImage src={Logo} alt="#"/>
            <h1>ADMIN</h1>
            <Navbar>
                <NavItem onClick={handleCartClick}><ShoppingCartRoundedIcon/></NavItem>
                <NavItem onClick={handleAdminClick}>Admin</NavItem>
                <NavItem onClick={handleChangeClick}>Change</NavItem>
                <NavItem onClick={handleProductClick}>Products</NavItem>
                <NavItem onClick={handleLogoutClick}>Logout</NavItem>
            </Navbar>
        </HeaderContainer>);
    } else if (test.admin === false) {
        return (<HeaderContainer>
            <LogoImage src={Logo} alt="#"/>
            <Navbar>
                <NavItem onClick={handleCartClick}><ShoppingCartRoundedIcon/></NavItem>
                <NavItem onClick={handleChangeClick}>Change</NavItem>
                <NavItem onClick={handleProductClick}>Products</NavItem>
                <NavItem onClick={handleLogoutClick}>Logout</NavItem>
            </Navbar>
        </HeaderContainer>);
    } else {
        return (<HeaderContainer>
            <LogoImage src={Logo} alt="#"/>
            <Navbar>
                <NavItem onClick={handleCartClick}><ShoppingCartRoundedIcon/></NavItem>
                <NavItem onClick={handleLoginClick}>Login</NavItem>
            </Navbar>
        </HeaderContainer>);
    }
}

export default Header;

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
