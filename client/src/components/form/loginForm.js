import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		identifier: '',
		password: '',
		remember: "",
	});

	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type !== 'checkbox') {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: checked,
			}));
		}
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		switch (true) {
			case formData.identifier.length < 6:
				alert('Username must be at least 6 characters long');
				break;
			case formData.password.length < 6:
				alert('Password must be at least 6 characters long');
				break;
			default:
				console.log(formData);
			try {
				const res = await fetch("localhost:4242/auth", {
					method: "GET",
					query: JSON.stringify(formData),
				});
				res.json();
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
						label="Email or username"
						variant="outlined"
						name="identifier"
						value={formData.identifier}
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
					<label>
						<input type="checkbox" name="remember" value="true" onChange={handleChange} style={{ marginTop: '10px' }} /> Remember me
					</label>
					<div className="link" style={{ marginTop: '20px' }}>
						<StyledLink to={{ pathname: "/register" }}>Create an account?</StyledLink>
					</div>
				</FormContainer>
			</CenteredContainer>
		</form>
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
	height: 'auto',
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
