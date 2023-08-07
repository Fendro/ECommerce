import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { TopCenterContainer } from '../styling';
import ReactModal from 'react-modal';
import { urlFetch } from "../../utils/urlFetch";
import { CheckContext } from '../../context/CheckContext';
ReactModal.setAppElement('body');
export default function CartForm() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { check, setCheck } = useContext(CheckContext);
    const checkUser = async () =>{
        try {
            const res = await fetch(urlFetch("auth"), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
            const json = await res.json();
            console.log(json.message);
            if (json.message =="A user is already logged in."){
                setCheck(true);
            }else{
                setCheck(false);
            }
        } catch (error) {
            console.log(" ");
        }
    }
    checkUser();
    console.log(check)
    if (check === true){
        return (
            <>
                <TopCenterContainer>
                    <h1>##List of articles##</h1>
                </TopCenterContainer>
                <TopCenterContainer>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => navigate("/delivery")}>
                        Order
                    </Button>
                </TopCenterContainer>

            </>
        )
    }
    return (
        <>
            <TopCenterContainer>
                <h1>##List of articles##</h1>
            </TopCenterContainer>
            <TopCenterContainer>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => setIsOpen(true)}>
                    Order
                </Button>
            </TopCenterContainer>
            <ReactModal
                isOpen={isOpen}
                contentLabel="Test"
                onRequestClose={() => setIsOpen(false)}
                style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: '600px',
                        height: '50px',
                        margin: '0 auto',
                        border: 'none',
                        borderRadius: '8px',
                        overflow: 'auto',
                        top: '50%',
                        left: '35%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        style={{ width: '45%', marginRight: '10px' }}
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            navigate("/delivery");
                        }}>
                        Continuer en tant qu'invité
                    </Button>
                    <Button
                        style={{ width: '45%' }}
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            navigate("/login");
                        }}>
                        Se connecter
                    </Button>
                </div>
            </ReactModal>
        </>
    )
}
