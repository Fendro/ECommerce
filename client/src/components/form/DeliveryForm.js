import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { Button } from "@mui/material";
import { CenteredContainer, FormContainer, StyledInput } from "../styling";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../utils/serverURL";
import { UserContext } from "../../context/UserContext";

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
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: inputMail.current.children[1].children[0].value,
      firstname: inputName.current.children[1].children[0].value,
      lastname: inputLastname.current.children[1].children[0].value,
      phone: inputPhone.current.children[1].children[0].value,
      address: inputAddress.current.children[1].children[0].value,
      country: inputCountry.current.children[1].children[0].value,
      city: inputCity.current.children[1].children[0].value,
      zipcode: inputZipcode.current.children[1].children[0].value,
    };

    axios
      .post(serverURL("/auth/guest"), formData)
      .then((response) => {
        const { data } = response;

        if (data.success) {
          setUser({ id: data.data.user_id });
          navigate("/final");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        console.error(error);
      });
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
  );
}
