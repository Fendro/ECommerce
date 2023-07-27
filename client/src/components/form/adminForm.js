import React from 'react';
import {Button} from '@mui/material';
import {TopCenterContainer} from '../styling';
import {EditRounded} from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function Admin() {
    return (
        <TopCenterContainer>
            <table>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>email</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>admin</td>
                    <td>admin@mail.com</td>
                    <td>
                        <Button variant="outlined">
                        <EditRounded/>
                        </Button>
                    </td>
                    <td>
                        <Button variant="outlined" color = "error">
                        <DeleteRoundedIcon/>
                        </Button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>user</td>
                    <td>user@mail.com</td>
                    <td>
                        <Button variant="outlined">
                        <EditRounded/>
                        </Button>
                    </td>
                    <td>
                        <Button variant="outlined" color = "error">
                            <DeleteRoundedIcon/>
                    </Button>
                    </td>
                </tr>
            </table>
        </TopCenterContainer>
    )
}