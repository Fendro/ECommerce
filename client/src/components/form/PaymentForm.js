import React, {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {serverURL} from "../../utils/serverURL";
import axios from "axios";
import {Button} from "@mui/material";
import {CenteredContainer, FormContainer, StyledInput} from "../styling";
import {UserContext} from "../../context/UserContext";

export default function Payment() {
    const navigate = useNavigate();
    const inputCard = useRef();
    const inputDate = useRef();
    const inputCountry = useRef();
    const [message, setMessage] = useState("");
    const [useSavedCard, setUseSavedCard] = useState(false);
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const {user, setUser} = useContext(UserContext);

    async function fetchSavedCards(userId) {
        try {
            const response = await axios.get(serverURL(`creditCards/${userId}`), {withCredentials: true});
            const cards = response.data.data;
            setSavedCards(cards);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleNewCardSubmission(cardDetails) {
        try {
            const response = await axios.post(serverURL(`creditCards/${user._id}`), cardDetails, {withCredentials: true});
            const newCard = response.data.data;
            setSelectedCard(newCard._id);
            localStorage.setItem("selectedCard", newCard._id);
            fetchSavedCards(user._id);
        } catch (error) {
            console.error("Error adding new card:", error);
        }
    }

    useEffect(() => {
        const userId = user._id;
        fetchSavedCards(userId);

        const storedSelectedCard = localStorage.getItem("selectedCard");
        if (storedSelectedCard && useSavedCard) {
            setSelectedCard(storedSelectedCard);
        }
    }, [useSavedCard]);

    function handleUseSavedCardChange(event) {
        setUseSavedCard(event.target.checked);

        if (!event.target.checked) {
            setSelectedCard(null);
            localStorage.removeItem("selectedCard");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (useSavedCard && selectedCard) {
            localStorage.setItem("selectedCard", selectedCard);
            console.log("Selected card:", selectedCard);
            // navigate("/final");
        } else {
            const cardDetails = {
                number: inputCard.current.children[1].children[0].value,
                expirationDate: inputDate.current.children[1].children[0].value,
                country: inputCountry.current.children[1].children[0].value
            };
            handleNewCardSubmission(cardDetails);
            console.log(selectedCard);
            // navigate("/final");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CenteredContainer>
                <FormContainer>
                    <div>{message}</div>

                    <label>
                        <input
                            type="checkbox"
                            checked={useSavedCard}
                            onChange={handleUseSavedCardChange}
                        />
                        Utiliser une carte enregistrée
                    </label>

                    {!useSavedCard && (
                        <>
                            <StyledInput
                                label="Carte de crédit"
                                type="tel"
                                minLength="16"
                                maxLength="16"
                                variant="outlined"
                                ref={inputCard}
                                fullWidth
                                required
                            />
                            <StyledInput
                                label="Valide jusqu'au"
                                type="tel"
                                pattern="[0-9]{2}/[0-9]{2}"
                                minLength="5"
                                maxLength="5"
                                variant="outlined"
                                ref={inputDate}
                                fullWidth
                                required
                            />
                            <StyledInput
                                label="Pays"
                                type="tel"
                                pattern="[0-9]{3}"
                                minLength="3"
                                maxLength="3"
                                variant="outlined"
                                ref={inputCountry}
                                fullWidth
                                required
                            />
                        </>
                    )}

                    {useSavedCard && savedCards.length > 0 && (
                        <div>
                            <p>Sélectionnez une carte:</p>
                            <select
                                value={selectedCard}
                                onChange={(e) => setSelectedCard(e.target.value)}
                            >
                                <option value="">Sélectionnez une carte</option>
                                {savedCards.map((card) => (
                                    <option key={card._id} value={card._id}>
                                        {card.number} - {card.expirationDate}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        width={"100"}
                        mb={"5"}
                    >
                        Faire le paiement
                    </Button>
                </FormContainer>
            </CenteredContainer>
        </form>
    );
}
