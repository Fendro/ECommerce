import React, { useState, useRef, useContext } from "react";
import { Button, Switch, FormControlLabel } from "@mui/material";
import { CenteredContainer, FormContainer, StyledInput } from "../styling";
import { UserContext } from "../../context/UserContext";
import { EmailContext } from "../../context/EmailContext";
import { useParams, useNavigate } from "react-router-dom";
import { serverURL } from "../../utils/serverURL";

export default function EditUser() {
    const { id } = useParams();
    const { admin, setAdmin } = useContext(UserContext);
    const { email, setEmail } = useContext(EmailContext);
    const [message, setMessage] = useState("");
    const inputMail = useRef();
    const inputPsw = useRef();
    const adminSwitch = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEmail = inputMail.current.children[1].children[0].value;
        const newPassword = inputPsw.current.children[1].children[0].value;
        const newAdmin = adminSwitch.current.checked;
        const updateData = {};
        if (newEmail) {
            updateData.email = newEmail;
        }
        if (newPassword) {
            updateData.password = newPassword;
        }
        updateData.admin = newAdmin;
        console.log(JSON.stringify(updateData));
        console.log(id)

        try {
            const res = await fetch(`http://localhost:4242/admin/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updateData),
            });
            const json = await res.json();
            if (json.success) {
                setEmail(json.data["email"]);
                setAdmin(json.data["admin"]);
                setMessage("User data updated successfully.");
                navigate("/admin");
            } else {
                setMessage("Failed to update user data.");
            }
        } catch (error) {
            console.log("Error:", error);
            setMessage("An error occurred while updating user data.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CenteredContainer>
                <FormContainer>
                    <div>{message}</div>
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
                    <FormControlLabel
                        control={
                            <Switch
                                inputRef={adminSwitch}
                                defaultChecked={admin}
                                color="primary"
                            />
                        }
                        label="Admin"
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
        </form>
    );
}
