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

export default function AddArticle() {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const inputTitle = useRef();
	const inputShortDesc = useRef();
	const inputContent = useRef();
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

		var file = inputImage.current.firstChild.firstChild.files?.[0];
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
		// const 


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
						<StyledInput ref={inputTitle} type="text" placeholder="Title" fullWidth required />
						<StyledInput ref={inputShortDesc} type="text" placeholder="Short description" fullWidth required />
						<StyledInput ref={inputContent} type="text" placeholder="Content" fullWidth required />
						<StyledInput ref={inputPrice} type="text" placeholder="Price" fullWidth required />
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
