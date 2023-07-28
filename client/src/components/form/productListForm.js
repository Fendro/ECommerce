import React, { useEffect, useState, useContext } from 'react';
import { AnyText, ProductContainer } from '../styling';
import { UserContext } from '../../context/UserContext';

export default function Product() {
	const { admin, setAdmin } = useContext(UserContext);
	const [fetchRes, setFetchRes] = useState(0);
	const [data, setData] = useState();


	useEffect(() => {
		(async () => {
			let json;
			try {
				json = await fetch("http://localhost:4242/articles", {
					method: "GET",
				}).then((response) => {
					return response.json();
				});
				
				setFetchRes(json.statusCode);
				if (json.statusCode === 200) {
					console.log(json.data);
					setData(json.data);
				}
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);
	console.log(fetchRes)
	switch (fetchRes) {
		case 0:
			return (
				<ProductContainer>
					<AnyText text={"Description is loading, please wait until server response"} width="80"></AnyText>
				</ProductContainer>
			);
		case 200:
			return (
				<>
					{data?.map((product) => (
						<ProductContainer>
							<AnyText text={product?.name ?? "default_name"} width="60"></AnyText>
							<AnyText text={product?.description ?? "default_desc"} width="80"></AnyText>
							<AnyText text={product?.price ?? "default_price"} width="20"></AnyText>
						</ProductContainer>
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
	}
}