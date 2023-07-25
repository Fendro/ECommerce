import React from 'react';
import {Box, Button, Container, TextField} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Link} from 'react-router-dom';

const RegistrationForm = () => {
    return (
        <CenteredContainer>
            <FormContainer>
                <StyledTextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                />
                <StyledTextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                />
                <StyledTextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                />
                <Button variant="contained" color="primary" type="submit" width={'100'} mb={'5'}>
                    Register
                </Button>
                <div className="link" style={{marginTop: '20px'}}>
                    <StyledLink to={{pathname: "/"}} target="_blank">Already have an account?</StyledLink>
                </div>
            </FormContainer>
        </CenteredContainer>
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
