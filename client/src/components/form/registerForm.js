import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledLink, StyledInput } from '../styling';

export default function Register() {

	const inputMail = useRef();
	const inputUser = useRef();
	const inputPsw = useRef();
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = inputMail.current.children[1].children[0].value;
		const username = inputUser.current.children[1].children[0].value;
		const password = inputPsw.current.children[1].children[0].value;

		let error_msg = "";
		if (email < 6)
			error_msg += "Email must be at least 6 characters long";
		if (username < 6)
			error_msg += "Username must be at least 6 characters long";
		if (password < 6)
			error_msg += "Password must be at least 6 characters long";

		if (error_msg.length) {
			alert(error_msg);
			return;
		}
		try {
			const res = await fetch("http://localhost:4242/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					username: username,
					password: password,
				}),
			});
			window.location.replace("/");
		} catch {
			setMessage("Couldn't find server. Please wait and try again.");
		}

	};

	return (
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
					/>
					<StyledInput
						label="Username"
						variant="outlined"
						minLength="6"
						ref={inputUser}
						fullWidth
					/>
					<StyledInput
						label="Password"
						type="password"
						variant="outlined"
						minLength="6"
						ref={inputPsw}
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