import axios from "axios";
import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {
	AnyImage,
	CenteredContainer,
	FormContainer,
	StyledInput,
	TopCenterContainer,
} from "../styling";
import { Form, useNavigate } from "react-router-dom";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { bodyCleaner } from "../../utils/bodyCleaner";
import { serverURL } from "../../utils/serverURL";
import { storageURL } from "../../utils/storageURL";

export default function AddArticle() {
	const navigate = useNavigate();
	const inputName = useRef();
	const inputDesc = useRef();
	const inputPrice = useRef();
	const inputQuantity = useRef();
	const inputImage = useRef();
	const [affImage, setAffImage] = useState();
	const [message, setMessage] = useState("");

	function handleList() {
		navigate("/admin");
	}

	function handleAddUser() {
		navigate("/admin/addUser");
	}

	function getImageFromLocal(e) {
		e.preventDefault();

		var file = inputImage.current.children[0].children[0].files?.[0];
		if (!file) return;

		const fileReader = new FileReader();
		fileReader.onload = function (fileLoadedEvent) {
			var srcData = fileLoadedEvent.target.result;
			setAffImage(srcData);
		};
		fileReader.readAsDataURL(file);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = bodyCleaner({
			name: inputName.current.children[1].children[0].value,
			description: inputDesc.current.children[1].children[0].value ?? "Pas de description",
			price: Number(inputPrice.current.children[1].children[0].value),
			images: [""],
			specs: [""],
			categories: [""],
			quantity: Number(inputQuantity.current.children[1].children[0].value) ?? 0,
		});

		console.log(formData);

		axios
			.post(serverURL("articles"), formData, { withCredentials: true })
			.then((response) => {
				const { data } = response;

				setMessage(data.message);
				return data.data._id;
			})
			.then((articleID) => {
				const imagesFormData = new FormData();
				for (const file of inputImage.current.children[0].children[0].files) {
					imagesFormData.append("images", file, file.name);
				}

				axios
					.post(storageURL(`images/${articleID}`), imagesFormData)
					.then((response) => {
						const { data } = response;

						setMessage(data.message);

						setTimeout(() => {
							navigate("/admin");
						}, 1000);
					})
					.catch((error) => {
						setMessage(error.response?.data.message ?? error.message);
					});
			})
			.catch((error) => {
				setMessage(error.response?.data.message ?? error.message);
			});
	}

	return (
		<>
			<TopCenterContainer>
				<Button variant="outlined" color="success" onClick={() => handleList()}>
					<PeopleAltRoundedIcon />
				</Button>
				<Button
					variant="outlined"
					color="success"
					onClick={() => handleAddUser()}
				>
					<PersonAddAlt1RoundedIcon />
				</Button>
			</TopCenterContainer>

			<form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
				<CenteredContainer>
					<FormContainer>
						<h1>Add an article</h1>
						<div>{message}</div>
						<StyledInput
							ref={inputName}
							type="text"
							label="Nom"
							fullWidth
							required
						/>
						<StyledInput
							ref={inputDesc}
							type="text"
							label="Description"
							multiline
							fullWidth
						/>
						<StyledInput
							className="specs"
							type="text"
							label="Specification"
							fullWidth
						/>
						<Button
							variant="outlined"
							color="secondary"
						// onClick={() => handleDelete(admin?._id)}
						>
							<AddIcon />
						</Button>
						<StyledInput
							ref={inputPrice}
							type="number"
							label="Prix"
							InputProps={{ inputProps: { min: 0, step: 0.01 } }}
							fullWidth
							required
						/>
						<StyledInput
							ref={inputQuantity}
							type="number"
							label="Quantité"
							InputProps={{ inputProps: { min: 0 } }}
							fullWidth
						/>
						<StyledInput
							ref={inputImage}
							type="file"
							onChange={getImageFromLocal}
							fullWidth
						/>
						<AnyImage url={affImage} />
						<Button
							variant="contained"
							color="primary"
							type="submit"
							width={"100"}
							mb={"5"}
						>
							Add
						</Button>
					</FormContainer>
				</CenteredContainer>
			</form>
		</>
	);
}
