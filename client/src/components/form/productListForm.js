import React, { useEffect, useState } from 'react';
import { AnyText, ProductContainer } from '../styling';
import { Link } from 'react-router-dom';

export default function Product() {
	const [fetchRes, setFetchRes] = useState(0);
	const [data, setData] = useState();

	useEffect(() => {
		(async () => {
			let json;
			try {
				json = await fetch("http://localhost:4242/product", {
					method: "GET",
				}).then((response) => {
					return response.json();
				});

				setFetchRes(json.statusCode);
				if (json.statusCode === 200) {
					setData(json.data);
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
					{data?.map((product, index) => (
						<Link to={"/articles/" + product?.name} style={{ textDecoration: 'none', color:'inherit'}}>
							<ProductContainer key={product?.id ?? index}>
								<AnyText text={product?.name} width="60"></AnyText>
								<AnyText text={product?.description} width="60"></AnyText>
								<AnyText text={product?.price} width="20"></AnyText>
							</ProductContainer>
						</Link>
					))}
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