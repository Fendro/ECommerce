import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CenteredContainer } from '../styling';

export default function Article() {
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
				setFetchRes("success");
				console.log(res);
				setData(res);
			} catch (e) {
				console.log(e);
				console.log(idProduct);
				setFetchRes("failed");
				// setFetchRes("server_off");
				// setFetchRes("article_none");
			}
		})();
		// eslint-disable-next-line
	}, []);


	return (
			<CenteredContainer>
			</CenteredContainer>
	);
}