import axios from "axios";
import React, { useRef, useState } from "react";
import { serverURL } from "../../utils/serverURL";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  CenteredContainer,
  FormContainer,
  StyledInput,
  StyledLink,
} from "../styling";

export default function Register() {
  const navigate = useNavigate();
  const inputMail = useRef();
  const inputPsw = useRef();
  const inputUser = useRef();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: inputMail.current.children[1].children[0].value,
      username: inputUser.current.children[1].children[0].value,
      password: inputPsw.current.children[1].children[0].value,
    };

    let error_msg = "";
    if (formData.email < 6)
      error_msg += "Email must be at least 6 characters long";
    if (formData.username < 6)
      error_msg += "Username must be at least 6 characters long";
    if (formData.password < 6)
      error_msg += "Password must be at least 6 characters long";

    if (error_msg.length) {
      alert(error_msg);
      return;
    }

    axios
      .post(serverURL("auth"), formData, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          setMessage(data.message);

          setTimeout(() => {
            navigate("/login");
          }, 500);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
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
            label="Username"
            variant="outlined"
            minLength="6"
            ref={inputUser}
            fullWidth
          />
          <StyledInput
            label="Password"
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
            Register
          </Button>
          <div className="link" style={{ marginTop: "20px" }}>
            <StyledLink to={{ pathname: "/login" }}>
              Already have an account?
            </StyledLink>
          </div>
        </FormContainer>
      </CenteredContainer>
    </form>
  );
}
