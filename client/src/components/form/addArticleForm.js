import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { AnyImage, CenteredContainer, FormContainer, StyledInput, StyledLink } from '../styling';
import { UserContext } from '../../context/UserContext';
import { EmailContext } from '../../context/EmailContext';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { TopCenterContainer } from '../styling';
import serverURL from '../../utils/serverURL';
import axios from 'axios';

export default function AddArticle() {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const inputTitle = useRef();
	const inputShortDesc = useRef();
	const inputPrice = useRef();
	const inputImage = useRef();
	const [affImage, setAffImage] = useState();

	function handleList() {
		navigate("/admin")
	}

	function handleAddUser() {
		navigate("/admin/addUser")
	}

	function getImageFromLocal(e) {
		e.preventDefault();

		var file = inputImage.current.children[0].children[0].files?.[0];
		if (!file)
			return;

		const fileReader = new FileReader();
		fileReader.onload = function (fileLoadedEvent) {
			var srcData = fileLoadedEvent.target.result;
			setAffImage(srcData);
		}
		fileReader.readAsDataURL(file);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const name = inputTitle.current.children[0].children[0].value;
		const price = inputPrice.current.children[0].children[0].value;
		const description = inputShortDesc.current.children[0].children[0].value;
		const images = [""];
		const specs = [];
		const categories = [""];
		const quantity = 0;

		try {
			const res = await fetch(serverURL("articles"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					price: price,
					description: description,
					images: images,
					specs: specs,
					categories: categories,
					quantity: quantity,
				}),
			});


			// window.location.replace("/admin");
		} catch {
			setMessage("Couldn't find server. Please wait and try again.");
		}


	}

	return (
		<>
			<TopCenterContainer>
				<Button variant="outlined" color="success" onClick={() => handleList()}><PeopleAltRoundedIcon /></Button>
				<Button variant="outlined" color="success" onClick={() => handleAddUser()}><PersonAddAlt1RoundedIcon /></Button>
			</TopCenterContainer>

			<form onSubmit={handleSubmit}>
				<CenteredContainer>
					<FormContainer>
						<h1>Add an article</h1>
						<StyledInput ref={inputTitle} type="text" placeholder="Nom" fullWidth required />
						<StyledInput ref={inputShortDesc} type="text" placeholder="Description" fullWidth required />
						<StyledInput ref={inputPrice} type="text" placeholder="Prix" fullWidth required />
						<StyledInput ref={inputImage} type="file" onChange={getImageFromLocal} fullWidth required />
						<AnyImage url={affImage} />
						<Button variant="contained" color="primary" type="submit" width={'100'} mb={'5'}>
							Add
						</Button>
					</FormContainer>
				</CenteredContainer>
			</form>
		</>
	)
}
