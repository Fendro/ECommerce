import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CenteredContainer>
                <FormContainer>
                    <StyledTextField
                        label="Email"
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
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                    />
                    <StyledTextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" type="submit" width={'100'} mb={'5'}>
                        Register
                    </Button>
                    <div className="link" style={{ marginTop: '20px' }}>
                        <StyledLink to={{ pathname: "/" }}>Already have an account?</StyledLink>
                    </div>
                </FormContainer>
            </CenteredContainer>
        </form>
    );
};

export default RegistrationForm;

const CenteredContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'darkorange',
    width: '600px',
    height: 'auto'
});

const StyledTextField = styled(TextField)({
    marginBottom: '30px',
    '& .MuiOutlinedInput-root': {
        background: 'white',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
        },
    },
});

const StyledLink = styled(Link)({
    marginTop: '50px',
});
