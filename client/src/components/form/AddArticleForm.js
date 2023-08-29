import axios from "axios";
import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

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
import ReactDOM from 'react-dom/client';

export default function AddArticle() {
	const navigate = useNavigate();
	const inputName = useRef();
	const inputDesc = useRef();
	const inputPrice = useRef();
	const inputQuantity = useRef();
	const inputImage = useRef();
	const imagesFiles = useRef([]);
	const [message, setMessage] = useState("");
	const [imagesDisplay, setImagesDisplay] = useState();

	function addSpec(elem) {
		let label = prompt("Quelle type de spécification ?");

		let Specs = elem.target;
		while (Specs.nodeName !== "BUTTON") {
			Specs = Specs.parentElement;
		}
		Specs = Specs.parentElement.parentElement;

		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.width = "100%";
		Specs.append(div);
		const root = ReactDOM.createRoot(div);
		root.render(
			<>
				<StyledInput
					className="specs"
					type="text"
					label={label}
					fullWidth
				/>
				<Button style={{ marginBottom: "30px" }}
					variant="outlined"
					color="secondary"
					onClick={removeParent}
				>
					<DeleteRoundedIcon />
				</Button>
			</>
		);
	}

	function updateImages() {
		const images = [];
		for (const file of imagesFiles.current) {
			images.push(URL.createObjectURL(file));
		}
		setImagesDisplay(images);
	}

	function addImage(e) {
		e.preventDefault();

		let error = "";
		for (const file of inputImage.current.children[0].children[0].files) {
			if (file.name.match(/.+\.(jpeg|jpg|png)/)) {
				imagesFiles.current.push(file);
			} else {
				error += `Le fichier ${file.name} n'a pas la bonne extension (.jpeg, .jpg, .png)\n`;
			}
		}

		updateImages();

		if (error != "") {
			alert(error);
		}
	}

	function removeImage(index) {
		imagesFiles.current.splice(index, 1);
		updateImages();
	}


	async function handleSubmit(e) {
		e.preventDefault();

		let specsDom = document.getElementsByClassName("specs");
		let specs = [];
		for (let i = 0; i < specsDom.length; i++) {
			let spec = "";
			spec += specsDom[i].children[1].innerText;
			spec += " : ";
			spec += specsDom[i].children[1].children[0].value;
			specs[i] = spec;
		}

		const formData = bodyCleaner({
			name: inputName.current.children[1].children[0].value,
			description: inputDesc.current.children[1].children[0].value ?? "Pas de description",
			price: Number(inputPrice.current.children[1].children[0].value),
			images: [],
			specs: specs,
			categories: [""],
			quantity: Number(inputQuantity.current.children[1].children[0].value) ?? 0,
		});


		axios
			.post(serverURL("articles"), formData, { withCredentials: true })
			.then((response) => {
				const { data } = response;

				setMessage(data.message);
				return data.data._id;
			})
			.then((articleID) => {
				const imagesFormData = new FormData;
				for (const file of imagesFiles.current) {
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

	function removeParent(elem) {
		let Parent = elem.target;
		while (Parent.nodeName !== "BUTTON") {
			Parent = Parent.parentElement;
		}
		Parent = Parent.parentElement;
		Parent.remove();

	}

	return (
		<>
			<TopCenterContainer>
				<Button variant="outlined" color="success" onClick={() => navigate("/admin")}>
					<PeopleAltRoundedIcon />
				</Button>
				<Button
					variant="outlined"
					color="success"
					onClick={() => navigate("/admin/addUser")}
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
						<FormContainer>
							<h2>Specifications</h2>
							<StyledInput
								className="specs"
								type="text"
								label="Width"
								fullWidth
							/>
							<StyledInput
								className="specs"
								type="text"
								label="Height"
								fullWidth
							/>
							<div style={{ display: "flex", width: "100%" }}>
								<StyledInput
									className="specs"
									type="text"
									label="Length"
									fullWidth
								/>
								<Button style={{ marginBottom: "30px" }}
									variant="outlined"
									color="secondary"
									onClick={addSpec}
								>
									<AddIcon />
								</Button>
							</div>
						</FormContainer>
						<StyledInput
							ref={inputImage}
							type="file"
							onChange={addImage}
							inputProps={{ multiple: true }}
							fullWidth
						/>
						{imagesDisplay?.map((file, index) => (
							<div style = {{width: "100%"}}>
								<Button style={{ position: "absolute" }}
									variant="outlined"
									color="secondary"
									onClick={() => { removeImage(index) }}
								>
									<DeleteRoundedIcon />
								</Button>
								<AnyImage src={file} />
							</div>
						))}
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
