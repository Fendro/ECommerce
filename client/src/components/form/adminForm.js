import React, { useEffect, useState } from "react";
import {Button} from '@mui/material';
import {TopCenterContainer} from '../styling';
import {EditRounded} from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CenteredContainer, FormContainer, StyledInput, StyledLink } from '../styling';

export default function Admin() {
    function handleDelete(email){
        fetch(`http://localhost:4242/admin/users/${email}`, {
            method: "DELETE",
        }).then((response) => {
            return response.json();
        })
            .then((response) => {
            if(response.statusCode === 200) {
                window.location.reload();
            }
        })
    }
    const [fetchRes, setFetchRes] = useState(0);
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            let json;
            try {
                json = await fetch("http://localhost:4242/admin/users", {
                    method: "GET",
                }).then((response) => {
                    return response.json();
                });
                setFetchRes(json.statusCode);
                if (json.statusCode === 200) {
                    setData(json.data);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);
    switch (fetchRes) {
        case 0:
            return (
                <TopCenterContainer>
                    <h1>Loading...</h1>
                </TopCenterContainer>
            );
        case 200:
            return (
                <TopCenterContainer>
                    <table>
                        <tbody>
                        <tr>
                            <th>username</th>
                            <th>email</th>
                        </tr>
                        {data?.map((admin,key) => (
                            <tr key={key}>
                                <td>{admin?.username ?? "default_username"}</td>
                                <td>{admin?.email ?? "default_email"}</td>
                                <td>
                                    <Button variant="outlined">
                                        <EditRounded/>
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outlined" color = "error" onClick={() => handleDelete(admin?.email)}>
                                        <DeleteRoundedIcon/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </TopCenterContainer>
            );
        case 400:
            return (
                <TopCenterContainer>
                    <h1>There is an error from server, please wait then try again.</h1>
                </TopCenterContainer>
            );
    }
}
