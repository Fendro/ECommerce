import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { TopCenterContainer } from '../styling';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { serverURL } from "../../utils/serverURL";

export default function Admin() {
	const navigate = useNavigate();
	const [fetched, setFetched] = useState(false);
	const [data, setData] = useState([]);
	const [reload, setReload] = useState(false);
	useEffect(() => {
		fetch(serverURL("admin/users"), {
			method: "GET", headers: {
				"Content-Type": "application/json",
			}, credentials: "include",
		}).then((response) => {
			return response.json();
		}).then((json) => {
			(json.success)
				? setData(json.data)
				: setData([]);
			setFetched(true);
		});
	}, [reload])
	function handleEdit(id) {
		navigate(`/admin/change/${id}`);
	}
	function handleDelete(id) {
		fetch(serverURL(`admin/users/${id}`), {
			method: "DELETE", headers: {
				"Content-Type": "application/json",
			}, credentials: "include"
		}).then((response) => {
			return response.json();
		}).then((json) => {
			if (json.success) {
				setFetched(false);
				setReload([!reload])
			};
		});
	}

	if (!fetched)
		return (<h1>Récupération de la liste des utilisateurs...</h1>);

	if (!data.length)
		return (<h1>Pas d'utilisateurs.</h1>);

	if (data.length)
		return (<>
			<TopCenterContainer>
				<Button variant="outlined" color="success" onClick={() => {

					navigate('/admin/addArticle');
				}}>
					<PostAddRoundedIcon />
				</Button>
				<Button variant="outlined" color="success" onClick={() => {
					navigate('/admin/addUser');
				}}>
					<PersonAddAlt1RoundedIcon />
				</Button>
			</TopCenterContainer>
			<TopCenterContainer>
				<table>
					<tbody>
						<tr>
							<th>username</th>
							<th>email</th>
						</tr>
						{data?.map((admin, key) => (<tr key={key}>
							<td>{admin?.username ?? "default_username"}</td>
							<td>{admin?.email ?? "default_email"}</td>
							<td>
								<Button
									variant="outlined"
									color="error"
									onClick={() => handleDelete(admin?._id)}
								>
									<DeleteRoundedIcon />
								</Button>
								<Button
									variant="outlined"
									color="primary"
									onClick={() => handleEdit(admin?._id)}>
									<EditRoundedIcon />
								</Button>
							</td>
						</tr>))}
					</tbody>
				</table>
			</TopCenterContainer>
		</>)
}
