import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledInput, StyledLink } from '../styling';

export default () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
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
			case formData.email.length < 6:
				alert('Username must be at least 6 characters long');
				break;
			case formData.password.length < 6:
				alert('Password must be at least 6 characters long');
				break;
			default:
			try {
				const res = await fetch("http://localhost:4242/auth?email="+formData.email+"&password="+formData.password, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				window.location.replace("/product")
			} catch{
				console.log("not ok")
				setMessage("Wrong credentials. Please try again.");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CenteredContainer>
				<FormContainer>
					<div>{message}</div>
					<StyledInput
						label="Email or username"
						type="email"
						variant="outlined"
						name="email"
						value={formData.email}
						onChange={handleChange}
						fullWidth
					/>
					<StyledInput
						label="Password"
						type="password"
						variant="outlined"
						name="password"
						value={formData.password}
						onChange={handleChange}
						fullWidth
					/>
					<Button variant="contained" color="primary" type="submit" width={'100'} mb={'5'}>
						Login
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