import axios from "axios";
import React, { useRef, useState } from "react";
import { bodyCleaner } from "../../utils/bodyCleaner";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../utils/serverURL";
import { Button } from "@mui/material";
import { CenteredContainer, FormContainer, StyledInput } from "../styling";

export default function EditUser() {
  const navigate = useNavigate();
  const currentPsw = useRef();
  const inputCurrentEmail = useRef();
  const inputMail = useRef();
  const inputPsw = useRef();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const edits = bodyCleaner({
      email: inputMail.current.children[1].children[0].value,
      password: inputPsw.current.children[1].children[0].value,
    });

    const formData = bodyCleaner({
      email: inputCurrentEmail.current.children[1].children[0].value,
      password: currentPsw.current.children[1].children[0].value,
      edits: edits,
    });

    let error_msg = "";
    if (formData.email.length < 6)
      error_msg += "Email must be at least 6 characters long";
    if (formData.password.length < 6)
      error_msg += "Password must be at least 6 characters long";

    if (error_msg.length) {
      alert(error_msg);
      return;
    }

    axios
      .put(serverURL("auth"), formData, { withCredentials: true })
      .then((response) => {
        const { data } = response;

        setMessage(data.message);

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        console.error(error.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}
