import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnyText, ProductContainer } from '../styling';

export default function Product() {
	const { idProduct } = useParams();
	const [fetchRes, setFetchRes] = useState("loading");
	const [data, setData] = useState();
	console.log(idProduct);

	useEffect(() => {
		(async () => {
			let res;
			console.log(res);
			try {
				res = await fetch("http://localhost:4242/product/".idProduct, {
					method: "GET",
					query: JSON.stringify(idProduct),
				});
				console.log(res);
				res = await res.json();
				setFetchRes("success");
				console.log(res);
				setData(res);
			} catch (e) {
				console.log(e);
				console.log(idProduct);
				setFetchRes("failed");
				// setFetchRes("server_off");
				// setFetchRes("product_none");
			}
		})();
		// eslint-disable-next-line
	}, []);

	if (true || fetchRes === "loading") {
		return (
			<ProductContainer>
				<AnyText text={"Product name"} width="60"></AnyText>
				<AnyText text={"Description is loading, please wait until server response"} width="80"></AnyText>
				<AnyText text={"X, between 0€ & 10^6€"} width="20"></AnyText>
			</ProductContainer>
		);	
	}

	if (fetchRes === "failed") {
		return (
			<ProductContainer>
				<AnyText text={""} width="60"></AnyText>
				<AnyText text={"There is an error from server, please wait then try again."} width="80"></AnyText>
			</ProductContainer>
		);	
	}

	if (fetchRes === "success") {
		return (
			<ProductContainer>
				<AnyText text={data.name} width="60"></AnyText>
				<AnyText text={data.description} width="80"></AnyText>
				<AnyText text={data.price} width="20"></AnyText>
			</ProductContainer>
		);	
	}
}