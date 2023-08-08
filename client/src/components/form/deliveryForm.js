import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledInput, StyledLink } from '../styling';
import { EmailContext } from '../../context/EmailContext';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import {TopCenterContainer} from '../styling';
import { IdContext } from '../../context/IdContext';



export default function AddUser() {
    const { id, setId } = useContext(IdContext);
    const navigate = useNavigate();
    const inputMail = useRef();
    const inputName = useRef();
    const inputPhone = useRef();
    const inputAddress = useRef();
    const inputLastname = useRef();
    const inputCountry = useRef();
    const inputCity = useRef();
    const inputZipcode = useRef();
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = inputMail.current.children[1].children[0].value;
        const firstname = inputName.current.children[1].children[0].value;
        const lastname = inputLastname.current.children[1].children[0].value;
        const phone = inputPhone.current.children[1].children[0].value;
        const address = inputAddress.current.children[1].children[0].value;
        const country = inputCountry.current.children[1].children[0].value;
        const city = inputCity.current.children[1].children[0].value;
        const zipcode = inputZipcode.current.children[1].children[0].value;

            fetch("http://localhost:4242/auth/guest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    address: address,
                    country: country,
                    city: city,
                    zip: zipcode,
                }),
            }).then((res) => {
                return res.json()
            }).then((data) => {
                setId(data.data.user_id)
                navigate("/final");
            });

    };
    console.log(id);
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
                            label="Firstname"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputName}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Lastname"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputLastname}
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
                        <StyledInput
                            label="Country"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputCountry}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="City"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputCity}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Zipcode"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputZipcode}
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
            );
        </>
    )
}