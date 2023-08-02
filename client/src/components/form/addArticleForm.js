import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledInput, StyledLink } from '../styling';
import {UserContext}  from '../../context/UserContext';
import { EmailContext } from '../../context/EmailContext';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import {TopCenterContainer} from '../styling';

export default function AddArticle() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const inputTitle = useRef();
    const inputShortDesc = useRef();
    const inputContent = useRef();
    const inputPrice = useRef();
    const inputImage = useRef();
    function handleList(){
        navigate("/admin")
    }
    function handleAddUser(){
        navigate("/admin/addUser")
    }
    return(
        <>
        <TopCenterContainer>
            <Button variant="outlined" color = "success" onClick={()=> handleList()}><PeopleAltRoundedIcon/></Button>
            <Button variant="outlined" color = "success" onClick={()=> handleAddUser()}><PersonAddAlt1RoundedIcon/></Button>
        </TopCenterContainer>
        <form>
        <CenteredContainer>
            <FormContainer>
                <h1>Add an article</h1>
                <StyledInput ref={inputTitle} type="text" placeholder="Title" required fullWidth />
                <StyledInput ref={inputShortDesc} type="text" placeholder="Short description" fullWidth required />
                <StyledInput ref={inputContent} type="text" placeholder="Content" fullWidth required />
                <StyledInput ref={inputPrice} type="text" placeholder="Price" fullWidth required />
                <StyledInput ref={inputImage} type="text" placeholder="Image" fullWidth required />
                <Button variant="contained" color="primary" type="submit" width={'100'} mb={'5'}>
                    Add
                </Button>
            </FormContainer>
        </CenteredContainer>
        </form>
        </>
    )
}
