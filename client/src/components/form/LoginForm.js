import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { serverURL } from "../../utils/serverURL";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  CenteredContainer,
  FormContainer,
  StyledInput,
  StyledLink,
} from "../styling";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const inputMail = useRef();
  const inputPsw = useRef();
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = inputMail.current.children[1].children[0].value;
    const password = inputPsw.current.children[1].children[0].value;
    let error_msg = "";
    if (email.length < 6)
      error_msg += "Email must be at least 6 characters long";
    if (password.length < 6)
      error_msg += "Password must be at least 6 characters long";

    if (error_msg.length) {
      alert(error_msg);
      return;
    }

    axios
      .post(
        serverURL("auth/login"),
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        const { data } = response;
        if (data.success) {
          setMessage(data.message);

          setTimeout(() => {
            setUser(data.data);
            navigate("/");
          }, 500);
        }
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
            label="Email or username"
            type="email"
            minLength="6"
            variant="outlined"
            ref={inputMail}
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
            Login
          </Button>
          <label>
            <input
              type="checkbox"
              name="remember"
              value="true"
              style={{ marginTop: "10px" }}
            />{" "}
            Remember me
          </label>
          <div className="link" style={{ marginTop: "20px" }}>
            <StyledLink to={{ pathname: "/register" }}>
              Create an account?
            </StyledLink>
          </div>
        </FormContainer>
      </CenteredContainer>
    </form>
  );
}
