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
import { serverURL } from '../../utils/serverURL';


export default function AddUser() {
    const navigate = useNavigate();
    const inputMail = useRef();
    const inputName = useRef();
    const inputPhone = useRef();
    const inputAddress = useRef();
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = inputMail.current.children[1].children[0].value;
        const name = inputName.current.children[1].children[0].value;
        const phone = inputPhone.current.children[1].children[0].value;
        const address = inputAddress.current.children[1].children[0].value;
        console.log(email, name, phone, address);
    };
    return(
        <>
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
                            requered
                        />
                        <StyledInput
                            label="Name"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputName}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Phone"
                            type="tel"
                            variant="outlined"
                            minLength="6"
                            ref={inputPhone}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Address"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputAddress}
                            fullWidth
                            requered
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            width={"100"}
                            mb={"5"}
                        >
                            Next step
                        </Button>
                    </FormContainer>
                </CenteredContainer>
            </form>
        </>
    )
}