import React, { useEffect, useRef, useState } from 'react';




export default function Article() {

	const [fetch, setFetch] = useState("loading");
	const [data, setData] = useState();

	useEffect(async () => {
		const ans = await fetch("", {method: "GET"}); // check https://tanstack.com/query/v3/
		if (ans.status >= 200 && ans.status < 300) {
			setFetch("success");
			setData(ans);
		} else {
			setFetch("failed");
		}


	}, []);


	return <Caroussel />;
}