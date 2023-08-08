import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {TopCenterContainer} from '../styling';
import ReactModal from 'react-modal';
import {serverURL} from "../../utils/serverURL";
import {CheckContext} from '../../context/CheckContext';

ReactModal.setAppElement('body');


const arts = [
    {id: 1, name: 'Product 1', price: 10, test: 1},
    {id: 2, name: 'Product 2', price: 20, test: 2},
    {id: 3, name: 'Product 3', price: 15, test: 3},
]
export default function CartForm() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const {check, setCheck} = useContext(CheckContext);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const res = await fetch(serverURL("auth/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const json = await res.json();
            if (json.message === "A user is already logged in.") {
                setCheck(true);
            } else {
                setCheck(false);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <TopCenterContainer>
                <h1>List of articles</h1>
            </TopCenterContainer>
            {arts.map(product => (
                <TopCenterContainer key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Quantity:{product.test}</p>
                </TopCenterContainer>
            ))}
            {check ? (
                <TopCenterContainer>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => navigate("/delivery")}
                    >
                        Order
                    </Button>
                </TopCenterContainer>
            ) : (
                <TopCenterContainer>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => setIsOpen(true)}
                    >
                        Order
                    </Button>
                </TopCenterContainer>
            )}
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
                    },
                }}
            >
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                        style={{width: '45%', marginRight: '10px'}}
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            navigate("/delivery");
                        }}
                    >
                        Continuer en tant qu'invité
                    </Button>
                    <Button
                        style={{width: '45%'}}
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Se connecter
                    </Button>
                </div>
            </ReactModal>
        </>
    );
}
