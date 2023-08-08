import React, {useRef, useState} from "react";
import {Button} from "@mui/material";
import {CenteredContainer, FormContainer, StyledInput} from "../styling";
import {useNavigate} from "react-router-dom";
import {serverURL} from "../../utils/serverURL";

export default function EditUser() {
    const [message, setMessage] = useState("");
    const inputCurrentEmail = useRef();
    const inputMail = useRef();
    const inputPsw = useRef();
    const currentPsw = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentEmail = inputCurrentEmail.current.children[1].children[0].value;
        const currentPassword = currentPsw.current.children[1].children[0].value;
        const newEmail = inputMail.current.children[1].children[0].value;
        const newPassword = inputPsw.current.children[1].children[0].value;

        const edits = {};
        if (newEmail) {
            edits.email = newEmail;
        }
        if (newPassword) {
            edits.password = newPassword;
        }

        const updateData = {email: currentEmail, password: currentPassword, edits: edits};
        console.log(updateData)

        try {
            const res = await fetch(serverURL("auth"), {
                method: "PUT", headers: {
                    "Content-Type": "application/json",
                }, credentials: "include", body: JSON.stringify(updateData),
            });
            const json = await res.json();
            if (json.success) {
                setMessage("User data updated successfully.");
                navigate("/");
            } else {
                setMessage("Failed to update user data.");
            }
        } catch (error) {
            console.log("Error:", error);
            setMessage("An error occurred while updating user data.");
        }
    };

    return (<form onSubmit={handleSubmit}>
        <CenteredContainer>
            <FormContainer>
                <div>{message}</div>
                <StyledInput
                    label="Current Email"
                    type="email"
                    minLength="6"
                    variant="outlined"
                    ref={inputCurrentEmail}
                    fullWidth
                />
                <StyledInput
                    label="Current Password"
                    type="password"
                    minLength="6"
                    variant="outlined"
                    ref={currentPsw}
                    fullWidth
                />
                <StyledInput
                    label="New Email"
                    type="email"
                    minLength="6"
                    variant="outlined"
                    ref={inputMail}
                    fullWidth
                />
                <StyledInput
                    label="New Password"
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
                    Update User
                </Button>
            </FormContainer>
        </CenteredContainer>
    </form>);
}
