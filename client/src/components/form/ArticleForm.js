import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AnyDiv, AnyImage, AnyText, ArticleContainer, Linebreak} from "../styling";
import {serverURL} from "../../utils/serverURL";
import {Button} from "@mui/material";

export default function Product() {
    const {id} = useParams();
    const [fetchRes, setFetchRes] = useState("loading");
    const [errorMsg, setErrorMsg] = useState("");
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            let json;
            console.log(id);
            try {
                json = await fetch(serverURL("articles/" + id), {
                    method: "GET",
                }).then((response) => {
                    return response.json();
                });

                setFetchRes(json.success);
                if (json.success) {
                    console.log(json.data);
                    setData(json.data);
                } else {
                    setErrorMsg(json.message);
                }
            } catch (e) {
                console.log(e);
            }
        })();
        // eslint-disable-next-line
    }, []);

    const addToCart = (articleId, quantity) => {
        const existingCart = JSON.parse(localStorage.getItem("packages")) || [];
        const cartPackageIndex = existingCart.findIndex(
            (cartPackage) => cartPackage.articles.find((article) => article.article_id === articleId)
        );
        if (cartPackageIndex !== -1) {
            existingCart[cartPackageIndex].articles.find(
                (article) => article.article_id === articleId
            ).quantity += quantity;
        } else {
            const articles = [{article_id: articleId, quantity}];
            existingCart.push({
                articles
            });
        }

        localStorage.setItem("packages", JSON.stringify(existingCart));
    };
    console.log(id)
    switch (fetchRes) {
        case "loading":
            return (
                <ArticleContainer>
                    <AnyText width="60">Product name</AnyText>
                    <AnyText width="80">
                        Description is loading, please wait until server response
                    </AnyText>
                </ArticleContainer>
            );
        case true:
            return (
                <>
                    <ArticleContainer>
                        <AnyText width="60">{data?.name ?? "default_name"}</AnyText>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            width={"100"}
                            mb={"5"}
                            onClick={() => addToCart(id, 1)}
                        >
                            Add to cart
                        </Button>
                        <Linebreak/>
                        <AnyImage width="30" bin={data?.image?.[0] ?? null}></AnyImage>
                        <AnyDiv width="60">
                        </AnyDiv>
                    </ArticleContainer>
                </>
            );
        case false:
            return <AnyText width="80">{errorMsg}</AnyText>;
        default:
            return (
                <ArticleContainer>
                    <AnyText width="80">There is an unrecognized error, good luck !</AnyText>
                </ArticleContainer>
            );
    }
}
