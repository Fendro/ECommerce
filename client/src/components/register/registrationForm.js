import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';



const RegistrationForm = () => {
	const email = useRef();
	const username = useRef();
	const password = useRef();
	const [message, setMessage] = useState("");


	async function Register() {
		// ans = await fetch("localhost:4242/register", {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		mail: email.current.value,
		// 		username: username.current.value,
		// 		password: password.current.value,
		// 	}),
		// });
		// if (ans.status >= 200 && ans.status < 300) {
		// 	// Tell user that register is OK.
		// } else {
		// 	// Tell user that register has failed
		// }
		console.log(email);
	}

	return (
		<CenteredContainer>
			<FormContainer>
				<div>{message}</div>
				<StyledTextField
					label="Email"
					ref={email}
					variant="outlined"
					fullWidth
				/>
				<StyledTextField
					label="Username"
					ref={username}
					variant="outlined"
					fullWidth
				/>
				<StyledTextField
					label="Password"
					ref={password}
					type="password"
					variant="outlined"
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
	);
}

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