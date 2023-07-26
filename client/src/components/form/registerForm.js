import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (true) {
        case formData.username.length < 6:
            alert("Username must be at least 6 characters long");
            break;
        case formData.password.length < 6:
            alert("Password must be at least 6 characters long");
            break;
        case formData.email.length < 6:
            alert("Email must be at least 6 characters long");
            break;
        default:
            console.log(formData);
      try {
        const res = await fetch("http://localhost:4242/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        window.location.replace("/");
      } catch {
        setMessage("Couldn't find server. Please wait and try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CenteredContainer>
        <FormContainer>
          <div>{message}</div>
          <StyledTextField
            label="Email"
            type="email"
            minLength="6"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <StyledTextField
            label="Username"
            variant="outlined"
            name="username"
            minLength="6"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <StyledTextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            minLength="6"
            value={formData.password}
            onChange={handleChange}
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
            <StyledLink to={{ pathname: "/" }}>
              Already have an account?
            </StyledLink>
          </div>
        </FormContainer>
      </CenteredContainer>
    </form>
  );
};

export default RegistrationForm;

const CenteredContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "darkorange",
  width: "600px",
  height: "auto",
});

const StyledTextField = styled(TextField)({
  marginBottom: "30px",
  "& .MuiOutlinedInput-root": {
    background: "white",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
});

const StyledLink = styled(Link)({
  marginTop: "50px",
});
