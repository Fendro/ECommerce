import axios from "axios";
import {CenteredContainer, FormContainer, StyledInput, TopCenterContainer,} from "../styling";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import React, {useRef, useState} from "react";
import {serverURL} from "../../utils/serverURL";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {bodyCleaner} from "../../utils/bodyCleaner";

export default function AddUser() {
    const navigate = useNavigate();
    const inputMail = useRef();
    const inputUser = useRef();
    const inputPsw = useRef();
    const [message, setMessage] = useState("");

    function handleAddProduct() {
        navigate("/admin/addArticle");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = bodyCleaner({
            email: inputMail.current.children[1].children[0].value,
            username: inputUser.current.children[1].children[0].value,
            password: inputPsw.current.children[1].children[0].value,
        });

        axios
            .post(serverURL("auth"), formData)
            .then((response) => {
                const {data} = response;

                setMessage(data.message);
                setTimeout(() => {
                    navigate("/admin");
                });
            })
            .catch((error) => {
                setMessage(error.response.data.message);
                console.error(error.response.data);
            });
    };

    function handleList() {
        navigate("/admin");
    }

    return (
        <>
            <TopCenterContainer>
                <Button variant="outlined" color="success" onClick={() => handleList()}>
                    <PeopleAltRoundedIcon/>
                </Button>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleAddProduct()}
                >
                    <PostAddRoundedIcon/>
                </Button>
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
                            label="Nom d'utilisateur"
                            variant="outlined"
                            minLength="6"
                            ref={inputUser}
                            fullWidth
                        />
                        <StyledInput
                            label="Mot de passe"
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
                            Inscrire
                        </Button>
                    </FormContainer>
                </CenteredContainer>
            </form>
            );
        </>
    );
}
