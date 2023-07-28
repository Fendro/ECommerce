import React, { useState, useRef, useEffect,useContext } from 'react';
import { Button } from '@mui/material';
import { CenteredContainer, FormContainer, StyledLink, StyledInput } from '../styling';
import { EmailContext } from '../../context/EmailContext';
export default function ChangeForm() {
    const inputMail = useRef();
    const inputUser = useRef();
    const [fetchRes, setFetchRes] = useState(0);
    const [data, setData] = useState([]);
    const { email, setEmail } = useContext(EmailContext);
    useEffect(() => {
        (async () => {
            let json;
            try {
                json = await fetch(`http://localhost:4242/admin/users/${email}`, {
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

    return (
        <form>
            {data?.map((admin,key) => (
            <CenteredContainer>
                <FormContainer>
                    <StyledInput
                        label="Email"
                        type="email"
                        minLength="6"
                        variant="outlined"
                        ref={inputMail}
                        defaultValue={admin.email}
                        fullWidth
                    />
                    <StyledInput
                        label="Username"
                        variant="outlined"
                        minLength="6"
                        ref={inputUser}
                        defaultValue={admin.username}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        width={"100"}
                        mb={"5"}
                    >
                        Change
                    </Button>
                </FormContainer>
            </CenteredContainer>
                ))}
        </form>
    );
};