import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledTextField, StyledLink } from '../styling';

export default () => {
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
		if (formData.identifier.length < 6) {
			alert('Username must be at least 6 characters long');
			return;
		} else if (formData.password.length < 6) {
			alert('Password must be at least 6 characters long');
			return;
		} else {
			console.log(formData);
			try {
				const res = await fetch("localhost:4242/auth/?email=" + formData.identifier + "&password=" + formData.password, {
					method: "GET",
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