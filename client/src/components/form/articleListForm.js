import React, { useEffect, useState, useContext } from 'react';
import { AnyText, ArticleContainer } from '../styling';
import { UserContext } from '../../context/UserContext';
import { urlFetch } from '../../utils/urlFetch';

export default function Product() {
	const { admin, setAdmin } = useContext(UserContext);
	const [fetchRes, setFetchRes] = useState("loading");
	const [errorMsg, setErrorMsg] = useState("");
	const [data, setData] = useState();


	useEffect(() => {
		(async () => {
			let json;
			try {
				json = await fetch(urlFetch("articles"), {
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
	}, []);
	console.log(data);
	console.log(fetchRes);

	switch (fetchRes) {
		case "loading":
			return (
				<ArticleContainer>
					<AnyText text={"Description is loading, please wait until server response"} width="80"></AnyText>
				</ArticleContainer>
			);
		case true:
			console.log(data);
			console.log("data");
			return (
				<>
					{data?.map((article, index) => (
						<ArticleContainer key={article.id ?? index} link={"/articles/" + article._id}>
							<AnyText text={article.name} width="60"></AnyText>
							<AnyText text={article.description} width="60"></AnyText>
							<AnyText text={article.price} width="20"></AnyText>
						</ArticleContainer>
					))}
				</>
			);
		case false:
			return (
					<AnyText text={errorMsg} width="80"></AnyText>
			);
		// case 400:
		// 	return (
		// 		<ArticleContainer>
		// 			<AnyText text={""} width="60"></AnyText>
		// 			<AnyText text={"There is an error from server, please wait then try again."} width="80"></AnyText>
		// 		</ArticleContainer>
		// 	);
		default:
			<ArticleContainer>
				<AnyText text={""} width="60"></AnyText>
				<AnyText text={"There is an unrecognized error, good luck !"} width="80"></AnyText>
			</ArticleContainer>
	}
}