import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';




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
				res = await fetch("localhost:4242/product/id", {
					method: "GET",
					query: JSON.stringify(idProduct),
				});
				setFetchRes("success");
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


	return <div />;
}