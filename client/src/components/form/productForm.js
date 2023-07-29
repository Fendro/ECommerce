import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnyText, ProductContainer } from '../styling';

export default function Product() {
	const { id } = useParams();
	const [fetchRes, setFetchRes] = useState("loading");
	const [data, setData] = useState();

	useEffect(() => {
		(async () => {
			let json;
			console.log(id);
			try {
				json = await fetch("http://localhost:4242/articles/" + id, {
					method: "GET",
				}).then((response) => {
					return response.json();
				});

				console.log(json);

				setFetchRes(json.statusCode);
				if (json.statusCode === 200) {
					setData(json.data[0]);
				}
			} catch (e) {
				console.log(e);
			}
		})();
		// eslint-disable-next-line
	}, []);

	switch (fetchRes) {
		case 0:
			return (
				<ProductContainer>
					<AnyText text={"Product name"} width="60"></AnyText>
					<AnyText text={"Description is loading, please wait until server response"} width="80"></AnyText>
					<AnyText text={fetchRes} width="20"></AnyText>
				</ProductContainer>
			);
		case 200:
			return (
				<>
					<ProductContainer>
						<AnyText text={data?.name ?? "default_name"} width="60"></AnyText>
						<AnyText text={data?.description ?? "default_desc"} width="80"></AnyText>
						<AnyText text={data?.price ?? "default_price"} width="20"></AnyText>
					</ProductContainer>

				</>
			);
		case 400:
			return (
				<ProductContainer>
					<AnyText text={""} width="60"></AnyText>
					<AnyText text={"There is an error from server, please wait then try again."} width="80"></AnyText>
				</ProductContainer>
			);
		default:
			<ProductContainer>
				<AnyText text={""} width="60"></AnyText>
				<AnyText text={"There is an unrecognized error, good luck !"} width="80"></AnyText>
			</ProductContainer>
	}
}