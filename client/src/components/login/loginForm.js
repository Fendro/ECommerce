import React from 'react';
import {Box, Button, Container, TextField} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Link} from 'react-router-dom';

const LoginForm = () => {
    return (
        <CenteredContainer>
            <FormContainer>
                <StyledTextField
                    label="Email or username"
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
                <label>
                    <input type="checkbox" name="remember" style={{marginTop: '10px'}}/> Remember me
                </label>
                <div className="link" style={{marginTop: '20px'}}>
                    <StyledLink to={{pathname: "/register"}}>Create an account?</StyledLink>
                </div>
            </FormContainer>
        </CenteredContainer>
    );
};

export default LoginForm;

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
