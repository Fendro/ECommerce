import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledInput, StyledLink } from '../styling';
import {UserContext}  from '../../context/UserContext';
import { EmailContext } from '../../context/EmailContext';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import {TopCenterContainer} from '../styling';
import { urlFetch } from '../../utils/urlFetch';


export default function AddUser() {
    const navigate = useNavigate();
    const inputMail = useRef();
    const inputUser = useRef();
    const inputPsw = useRef();
    const [message, setMessage] = useState("");
    function handleAddProduct(){
        navigate("/admin/addArticle")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = inputMail.current.children[1].children[0].value;
        const username = inputUser.current.children[1].children[0].value;
        const password = inputPsw.current.children[1].children[0].value;
        try{
            const res = await fetch(urlFetch("auth"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                }),
            });
            window.location.replace("/admin");
        }catch {
            setMessage("Couldn't find server. Please wait and try again.");
        }
    };
    function handleList(){
        navigate("/admin")
    }

    return(
        <>
        <TopCenterContainer>
            <Button variant="outlined" color = "success" onClick={()=> handleList()}><PeopleAltRoundedIcon/></Button>
            <Button variant="outlined" color = "success" onClick={()=> handleAddProduct()}><PostAddRoundedIcon/></Button>
        </TopCenterContainer>
            <form onSubmit={handleSubmit}>
                <CenteredContainer>
                    <FormContainer>
                        <div>{message}</div>
                        <StyledInput
                            label="Email"
                            type="email"
                            minLength="6"
                            variant="outlined"
                            ref={inputMail}
                            fullWidth
                        />
                        <StyledInput
                            label="Username"
                            variant="outlined"
                            minLength="6"
                            ref={inputUser}
                            fullWidth
                        />
                        <StyledInput
                            label="Password"
                            type="password"
                            variant="outlined"
                            minLength="6"
                            ref={inputPsw}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            width={"100"}
                            mb={"5"}
                        >
                            Register
                        </Button>
                        <div className="link" style={{ marginTop: "20px" }}>
                            <StyledLink to={{ pathname: "/login" }}>
                                Already have an account?
                            </StyledLink>
                        </div>
                    </FormContainer>
                </CenteredContainer>
            </form>
            );
        </>
    )
}