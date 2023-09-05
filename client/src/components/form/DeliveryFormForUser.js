import React, {useContext, useRef, useState} from "react";
import {Button} from "@mui/material";
import {CenteredContainer, FormContainer, StyledInput} from "../styling";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import {bodyCleaner} from "../../utils/bodyCleaner";

export default function AddUser() {
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
    const {setUser} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = bodyCleaner({
            email: inputMail.current.children[1].children[0].value,
            firstname: inputName.current.children[1].children[0].value,
            lastname: inputLastname.current.children[1].children[0].value,
            phone: inputPhone.current.children[1].children[0].value,
            address: inputAddress.current.children[1].children[0].value,
            country: inputCountry.current.children[1].children[0].value,
            city: inputCity.current.children[1].children[0].value,
            zip: inputZipcode.current.children[1].children[0].value,
        });
        //
        // axios
        //     .post(serverURL("auth/guest"), formData)
        //     .then((response) => {
        //         const {data} = response;
        //
        //         setUser({_id: data.data._id});
        //         navigate("/final");
        //     })
        //     .catch((error) => {
        //         setMessage(error.response.data.message);
        //         console.error(error.response.data);
        //     });
        navigate("/payment");
    };

    return (
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
                            label="Prénom"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputName}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Nom"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputLastname}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Numero de téléphone"
                            type="tel"
                            variant="outlined"
                            minLength="6"
                            ref={inputPhone}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Adresse"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputAddress}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Pays"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputCountry}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Ville"
                            type="text"
                            variant="outlined"
                            minLength="6"
                            ref={inputCity}
                            fullWidth
                            requered
                        />
                        <StyledInput
                            label="Code postale"
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
                            Continuer
                        </Button>
                    </FormContainer>
                </CenteredContainer>
            </form>
            );
        </>
    );
}
