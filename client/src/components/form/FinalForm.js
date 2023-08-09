import axios from "axios";
import {serverURL} from "../../utils/serverURL";
import {useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext";
import {logRules} from "../../utils/logRules";

export default function Login() {
    const {user} = useContext(UserContext);

    useEffect(() => {
        const localOrders = localStorage.getItem("packages");

        if (localOrders) {
            const parsedOrders = JSON.parse(localOrders);

            const ordersToSend = parsedOrders.map((userPackage) => ({
                articles: userPackage.articles.map((article) => ({
                    article_id: article.article_id,
                    quantity: article.quantity,
                })),
                shippingMethod: "standard"
            }));

            const requestData = {
                user_id: user._id,
                packages: ordersToSend,
            };

            console.log("requestData:", requestData, typeof requestData);
            console.log("user_id:", requestData.user_id, typeof requestData.user_id);
            console.log("packages:", requestData.packages, typeof requestData.packages);
            console.log("articles:", requestData.packages[0].articles, typeof requestData.packages[0].articles);
            console.log("shippingMethod:", requestData.packages[0].shippingMethod, typeof requestData.packages[0].shippingMethod);
            console.log("article_id:", requestData.packages[0].articles[0].article_id, typeof requestData.packages[0].articles[0].article_id);
            console.log("quantity:", requestData.packages[0].articles[0].quantity, typeof requestData.packages[0].articles[0].quantity);

            axios
                .post(serverURL("orders"), requestData)
                .then((response) => {
                    const {data} = response;
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    logRules(error.response.data);
                });
        }
    }, []);

    return null;
}
