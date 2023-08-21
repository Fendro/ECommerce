import React, {useContext, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {CenteredContainer, FormContainer, StyledInput,} from "../styling";
import {UserContext} from "../../context/UserContext";

export default function Payment() {
    const navigate = useNavigate();
    const inputCard = useRef();
    const inputDate = useRef();
    const inputCVV = useRef();
    const [message, setMessage] = useState("");
    const {user, setUser} = useContext(UserContext);

    //TODO: make request to server to get the user's cart, and change status of payment to true in DB
    function handleSubmit(e) {
        console.log(inputCVV.current.children[1].children[0].value);
        console.log(inputDate.current.children[1].children[0].value);
        console.log(inputCard.current.children[1].children[0].value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <CenteredContainer>
                <FormContainer>
                    <div>{message}</div>
                    <StyledInput
                        label="Carte de crédit"
                        type="tel"
                        minLength="16"
                        maxLength="16"
                        variant="outlined"
                        ref={inputCard}
                        fullWidth
                    />
                    <StyledInput
                        label="Valide jusqu'au"
                        type="tel"
                        pattern="[0-9]{2}/[0-9]{2}"
                        minLength="5"
                        maxLength="5"
                        variant="outlined"
                        ref={inputDate}
                        fullWidth
                    />
                    <StyledInput
                        label="Code de sécurité"
                        type="tel"
                        pattern="[0-9]{3}"
                        minLength="3"
                        maxLength="3"
                        variant="outlined"
                        ref={inputCVV}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        width={"100"}
                        mb={"5"}
                    >
                        Faire le paiement
                    </Button>
                </FormContainer>
            </CenteredContainer>
        </form>
    );
}
