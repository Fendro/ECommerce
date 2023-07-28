import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnyText, ProductContainer } from "../styling";

export default function Product() {
  const { id } = useParams();
  const [fetchRes, setFetchRes] = useState("loading");
  const [data, setData] = useState();
  console.log(id);

  useEffect(() => {
    (async () => {
      let json;
      try {
        json = await fetch("http://localhost:4242/articles/" + id, {
          method: "GET",
          query: JSON.stringify(id),
        }).then((response) => {
          console.log(response);
          return response.json();
        });
        console.log(json);
        setFetchRes("success");
        setData(json.message);
      } catch (e) {
        console.log(e);
        console.log(id);
        setFetchRes("failed");
        // setFetchRes("server_off");
        // setFetchRes("product_none");
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (fetchRes === "loading") {
    return (
      <ProductContainer>
        <AnyText text={"Product name"} width="60"></AnyText>
        <AnyText
          text={"Description is loading, please wait until server response"}
          width="80"
        ></AnyText>
        <AnyText text={fetchRes} width="20"></AnyText>
      </ProductContainer>
    );
  }

  if (fetchRes === "failed") {
    return (
      <ProductContainer>
        <AnyText text={""} width="60"></AnyText>
        <AnyText
          text={"There is an error from server, please wait then try again."}
          width="80"
        ></AnyText>
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
