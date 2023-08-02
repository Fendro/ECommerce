import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import {
	CenteredContainer,
	FormContainer,
	StyledInput,
	StyledLink,
} from "../styling";
import { UserContext } from "../../context/UserContext";
import { EmailContext } from "../../context/EmailContext";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { urlFetch } from "../../utils/urlFetch";

export default function Login() {
	const [message, setMessage] = useState("");
	const inputMail = useRef();
	const inputPsw = useRef();
	const { admin, setAdmin } = useContext(UserContext);
	const { email, setEmail } = useContext(EmailContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = inputMail.current.children[1].children[0].value;
		const password = inputPsw.current.children[1].children[0].value;
		let error_msg = "";
		if (email.length < 6)
			error_msg += "Email must be at least 6 characters long";
		if (password.length < 6)
			error_msg += "Password must be at least 6 characters long";

		if (error_msg.length) {
			alert(error_msg);
			return;
		}

		try {
			const res = await fetch(urlFetch("auth", { email, password }), {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			},
			);
			const json = await res.json();
			if (json.success) {
				setEmail(json.data["email"]);
				setAdmin(json.data["admin"]);
					navigate("/");
			} else if (json.data) {
				setEmail(json.data["email"]);
				setAdmin(json.data["admin"]);
				setMessage(json.message);
					navigate("/");
			} else {
				setMessage("Wrong credentials. Please try again.");
			}
		} catch (error) {
			console.log("not ok", error);
			setMessage("Wrong credentials. Please try again.");
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
						minLength="6"
						variant="outlined"
						ref={inputMail}
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
						Login
					</Button>
					<label>
						<input
							type="checkbox"
							name="remember"
							value="true"
							style={{ marginTop: "10px" }}
						/>{" "}
						Remember me
					</label>
					<div className="link" style={{ marginTop: "20px" }}>
						<StyledLink to={{ pathname: "/register" }}>
							Create an account?
						</StyledLink>
					</div>
				</FormContainer>
			</CenteredContainer>
		</form>
	);
}
