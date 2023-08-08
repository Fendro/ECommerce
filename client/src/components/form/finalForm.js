import { useEffect, useContext } from "react";
import { IdContext } from "../../context/IdContext";

export default function Login() {
    const { id, setId } = useContext(IdContext);
    console.log(id);

    const requestData = {
        user_id: '64d1fde0d5ec9a84f07dfde8',
        packages: [
            {
                article: "64cd13edb440f851562076cb",
                quantity: 2,
            },
            {
                article: "64ce73f002170dc7aa3c72b6",
                quantity: 6,
            },
        ],
    };
    console.log(requestData);

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            user_id: '64d1fde0d5ec9a84f07dfde8',
            packages: [
                {
                    articles: "64d20169d5ec9a84f07dfdea",
                    quantity: 2,
                },
                {
                    articles: "64d2016dd5ec9a84f07dfdeb",
                    quantity: 6,
                },
            ],
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        fetch("http://localhost:4242/orders/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }, []);

    return null;
}
