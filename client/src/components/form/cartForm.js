import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { TopCenterContainer } from '../styling';
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

export default function CartForm() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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
                            console.log("ok as guest")
                        }}>
                        Continuer en tant qu'invité
                    </Button>
                    <Button
                        style={{ width: '45%' }}
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            console.log("ok as login")
                        }}>
                        Se connecter
                    </Button>
                </div>
            </ReactModal>
        </>
    )
}
