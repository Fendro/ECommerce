import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledTextField, StyledLink } from '../styling';

export default () => {
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
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
		if (formData.username.length < 6) {
			alert('Username must be at least 6 characters long');
			return;
		} else if (formData.password.length < 6) {
			alert('Password must be at least 6 characters long');
			return;
		} else if (formData.email.length < 6) {
			alert('Email must be at least 6 characters long');
			return;
		} else {
			console.log(formData);
			try {
				const res = await fetch("localhost:4242/auth", {
					method: "POST",
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