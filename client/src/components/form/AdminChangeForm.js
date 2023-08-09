import axios from "axios";
import React, { useRef, useState } from "react";
import { bodyCleaner } from "../../utils/bodyCleaner";
import { serverURL } from "../../utils/serverURL";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { CenteredContainer, FormContainer, StyledInput } from "../styling";

export default function EditUser() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const inputMail = useRef();
  const inputPsw = useRef();
  const adminSwitch = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = bodyCleaner({
      email: inputMail.current.children[1].children[0].value,
      password: inputPsw.current.children[1].children[0].value,
      admin: adminSwitch.current.checked,
    });

    axios
      .put(serverURL(`admin/users/${id}`), formData)
      .then((response) => {
        const { data } = response;

        setMessage(data.message);

        setTimeout(() => {
          navigate("/admin");
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
                defaultChecked={false}
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
