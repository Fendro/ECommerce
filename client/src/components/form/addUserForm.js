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

export default function AddUser() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputName = useRef();
    const inputRole = useRef();
    function handleList(){
        navigate("/admin")
    }
    function handleAddProduct(){
        navigate("/admin/addArticle")
    }
    return(
        <>
        <TopCenterContainer>
            <Button variant="outlined" color = "success" onClick={()=> handleList()}><PeopleAltRoundedIcon/></Button>
            <Button variant="outlined" color = "success" onClick={()=> handleAddProduct()}><PostAddRoundedIcon/></Button>
        </TopCenterContainer>
        <form>
        <CenteredContainer>
            <FormContainer>
                <h1>Add a user</h1>
                <StyledInput ref={inputEmail} type="text" placeholder="Email" required fullWidth />
                <StyledInput ref={inputPassword} type="text" placeholder="Password" fullWidth required />
                <StyledInput ref={inputName} type="text" placeholder="Name" fullWidth required />
                <StyledInput ref={inputRole} type="text" placeholder="Role" fullWidth required />
                <Button variant="contained" color="primary" type="submit" width={'100'} mb={'5'}>
                    Add
                </Button>
            </FormContainer>
        </CenteredContainer>
        </form>
        </>
    )
}