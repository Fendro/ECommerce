import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	AnyDiv,
	AnyImage,
	AnyText,
	ArticleContainer,
	Linebreak,
} from "../styling";
import { serverURL } from "../../utils/serverURL";
import { ArticleContext } from "../../context/ArticleContext";
import { Button } from "@mui/material";

export default function Product() {
	const { article, setArticle } = useContext(ArticleContext);
	const { id } = useParams();
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
	const addToCart = (articleId, quantity, articleName, articleImage) => {
		const existingCart = JSON.parse(localStorage.getItem("packages")) || [];
		const cartPackageIndex = existingCart.findIndex((cartPackage) =>
			cartPackage.articles.find((article) => article.article_id === articleId),
		);
		if (cartPackageIndex !== -1) {
			existingCart[cartPackageIndex].articles.find(
				(article) => article.article_id === articleId,
			).quantity += quantity;
		} else {
			const articles = [
				{ article_id: articleId, quantity, articleName, articleImage },
			];
			existingCart.push({
				articles,
			});
		}

		localStorage.setItem("packages", JSON.stringify(existingCart));
		addToContext(articleId, quantity, articleName, articleImage);
	};

	const addToContext = (articleId, quantity, articleName) => {
		let existingArticle = null;
		for (const key in article) {
			if (article[key].article_id === articleId) {
				existingArticle = article[key];
				break;
			}
		}

		if (existingArticle) {
			const updatedArticle = {
				...existingArticle,
				quantity: existingArticle.quantity + quantity,
			};
			const updatedArticleList = {
				...article,
				[existingArticle.article_id]: updatedArticle,
			};

			setArticle(updatedArticleList);
		} else {
			const newArticle = {
				article_id: articleId,
				quantity: quantity,
				name: articleName,
			};
			const updatedArticleList = {
				...article,
				[newArticle.article_id]: newArticle,
			};

			setArticle(updatedArticleList);
		}
	};
	console.log(article);
	console.log(id);
	switch (fetchRes) {
		case "loading":
			return (
				<ArticleContainer>
					<AnyText width="60">Nom du produit</AnyText>
					<AnyText width="80">
						La description est en cours de chargement, veuillez attendre la
						réponse du serveur
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
							onClick={() =>
								addToCart(id, 1, data?.name, data?.images?.[0] ?? null)
							}
						>
							Ajouter au panier
						</Button>
						<Linebreak />
						<AnyImage width="30" bin={data?.image?.[0] ?? null}></AnyImage>
						<AnyDiv width="60">
							<AnyText width="100">
								{data?.description ?? "default_desc"}
							</AnyText>
							<AnyText width="100" color={data?.quantity > 0 ? "" : "red"}>
								{data?.quantity === undefined
									? "Unknown remainign quantity"
									: // eslint-disable-next-line
									data.quantity === 0
										? "rupture de stock"
										: data.quantity +
										` article${data.quantity > 1 ? "s" : ""} restant${data.quantity > 1 ? "s" : ""
										}`}
							</AnyText>
							<AnyText width="50">{data?.price ?? "??? "}€</AnyText>
						</AnyDiv>
						<AnyText width="80">{data?.specs ?? "default_specs"}</AnyText>
						<AnyDiv width="60"></AnyDiv>
					</ArticleContainer>
				</>
			);
		case false:
			return <AnyText width="80">{errorMsg}</AnyText>;
		default:
			return (
				<ArticleContainer>
					<AnyText width="80">
						There is an unrecognized error, good luck !
					</AnyText>
				</ArticleContainer>
			);
	}
}
