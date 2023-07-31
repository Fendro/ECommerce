import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material';
import {TopCenterContainer} from '../styling';
import {EditRounded} from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { CenteredContainer, FormContainer, StyledInput, StyledLink } from '../styling';

export default function Admin() {
    const navigate = useNavigate();

    function handleAdd() {
        navigate('/admin/addArticle');
    }

    function handleAddUser(){
        navigate ('/admin/addUser')
    }
    function test(test){
        console.log(test);
    }
    function handleDelete(id) {
        fetch(`http://localhost:4242/admin/users/${id}`, {
            method: "DELETE",
            credentials: "include"
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response.message);
            if(response.statusCode === 200) {
                window.location.reload();
            }
        });
    }

    const [fetchRes, setFetchRes] = useState(0);
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:4242/admin/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const json = await response.json();
                console.log(json["success"])
                setFetchRes(json["success"]);
                if (json.success) {
                    setData(json.data);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    switch (fetchRes) {
        case true:
            return (
                <>
                    <TopCenterContainer>
                        <Button variant="outlined" color="success" onClick={() => handleAdd()}>
                            <PostAddRoundedIcon />
                        </Button>
                        <Button variant="outlined" color="success" onClick={()=> handleAddUser()}>
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
                            {data?.map((admin, key) => (
                                <tr key={key}>
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
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </TopCenterContainer>
                </>
            );
        case 400:
            return (
                <TopCenterContainer>
                    <h1>There is an error from the server, please wait then try again.</h1>
                </TopCenterContainer>
            );
        default:
            return null; // Add a default case or return some other fallback component if needed
    }
}
