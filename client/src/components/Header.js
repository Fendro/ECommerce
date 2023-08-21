import React, {useContext, useEffect} from "react";
import Logo from "./asset/logo.png";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {serverURL} from "../utils/serverURL";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import axios from "axios";
import {UserContext} from "../context/UserContext";

function Header() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(user).length) return;

        axios
            .post(serverURL("auth/login"), {}, {withCredentials: true})
            .then((response) => {
                const {data} = response;

                if (data.success) {
                    setUser(data.data);
                } else if (data.data) {
                    setUser(data.data);
                }
            })
            .catch(() => {
            });
    }, []);

    const handleLogoClick = () => {
        navigate("/");
    };
    const handleAdminClick = () => {
        navigate("/admin");
    };
    const handleChangeClick = () => {
        navigate("/change");
    };
    const handleProductClick = () => {
        navigate("/articles");
    };
    const handleCartClick = () => {
        navigate("/cart");
    };
    const handleLoginClick = () => {
        navigate("/login");
    };
    const handleLogoutClick = async () => {
        axios
            .post(serverURL("auth/logout"), {}, {withCredentials: true})
            .then((response) => {
                const {data} = response;

                if (data.success) setUser({});

                navigate("/");
            })
            .catch((error) => {
                console.error(error.response.data);
            });
        localStorage.clear();
    };
    if (user.admin === true) {
        return (
            <HeaderContainer>
                <LogoImage src={Logo} alt="Logo Trinity" onClick={handleLogoClick}/>
                <h1>ADMIN</h1>
                <Navbar>
                    <NavItem onClick={handleCartClick}>
                        <ShoppingCartRoundedIcon/>
                    </NavItem>
                    <NavItem onClick={handleAdminClick}>Admin</NavItem>
                    <NavItem onClick={handleChangeClick}>Changer</NavItem>
                    <NavItem onClick={handleProductClick}>Produits</NavItem>
                    <NavItem onClick={handleLogoutClick}>Se déconnecter</NavItem>
                </Navbar>
            </HeaderContainer>
        );
    } else if (user.admin === false) {
        return (
            <HeaderContainer>
                <LogoImage src={Logo} alt="Logo Trinity" onClick={handleLogoClick}/>
                <Navbar>
                    <NavItem onClick={handleCartClick}>
                        <ShoppingCartRoundedIcon/>
                    </NavItem>
                    <NavItem onClick={handleChangeClick}>Changer</NavItem>
                    <NavItem onClick={handleProductClick}>Produits</NavItem>
                    <NavItem onClick={handleLogoutClick}>Se déconnecter</NavItem>
                </Navbar>
            </HeaderContainer>
        );
    } else {
        return (
            <HeaderContainer>
                <LogoImage src={Logo} alt="Logo Trinity" onClick={handleLogoClick}/>
                <Navbar>
                    <NavItem onClick={handleCartClick}>
                        <ShoppingCartRoundedIcon/>
                    </NavItem>
                    <NavItem onClick={handleLoginClick}>S'inscrire</NavItem>
                </Navbar>
            </HeaderContainer>
        );
    }
}

export default Header;

const HeaderContainer = styled.div`
  background-color: darkorange;
  padding: 5px;
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: space-between;
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
