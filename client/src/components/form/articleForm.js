import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnyImage, AnyText, ArticleContainer, Linebreak } from '../styling';
import { urlFetch } from '../../utils/urlFetch';

export default function Product() {
	const { id } = useParams();
	const [fetchRes, setFetchRes] = useState("loading");
	const [errorMsg, setErrorMsg] = useState("");
	const [data, setData] = useState();

	useEffect(() => {
		(async () => {
			let json;
			console.log(id);
			try {
				json = await fetch(urlFetch("articles/" + id), {
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

	switch (fetchRes) {
		case "loading":
			return (
				<ArticleContainer>
					<AnyText text={"Product name"} width="60"></AnyText>
					<AnyText text={"Description is loading, please wait until server response"} width="80"></AnyText>
				</ArticleContainer>
			);
		case true:
			return (
				<>
					<ArticleContainer>
						<AnyText text={data?.name ?? "default_name"} width="60"></AnyText>
						<Linebreak />
						<AnyImage width="30"></AnyImage>
						<AnyText text={data?.description ?? "default_desc"} width="35"></AnyText>
						<AnyText text={data?.price ?? "default_price"} width="20"></AnyText>
						<AnyText text={data?.specs ?? "default_specs"} width="80"></AnyText>
					</ArticleContainer>

				</>
			);
			case false:
				return (
						<AnyText text={errorMsg} width="80"></AnyText>
				);
		default:
			<ArticleContainer>
				<AnyText text={""} width="60"></AnyText>
				<AnyText text={"There is an unrecognized error, good luck !"} width="80"></AnyText>
			</ArticleContainer>
	}
}