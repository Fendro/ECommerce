import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AnyDiv,
  AnyImage,
  AnyText,
  ArticleContainer,
  Linebreak,
} from "../styling";
import { serverURL } from "../../utils/serverURL";

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
        json = await fetch(serverURL("articles/" + id), {
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
          <AnyText width="60">Product name</AnyText>
          <AnyText width="80">
            Description is loading, please wait until server response
          </AnyText>
        </ArticleContainer>
      );
    case true:
      return (
        <>
          <ArticleContainer>
            <AnyText width="60">{data?.name ?? "default_name"}</AnyText>
            <Linebreak />
            <AnyImage width="30" bin={data?.image?.[0] ?? null}></AnyImage>
            <AnyDiv width="60">
              <AnyText width="100">
                {data?.description ?? "default_desc"}
              </AnyText>
              <AnyText width="100" color={data?.quantity > 0 ? "" : "red"}>
                {data?.quantity === undefined
                  ? "Unknown remainign quantity"
                  : // eslint-disable-next-line
                  data.quantity === 0
                  ? "rupture de stock"
                  : data.quantity +
                    ` article${data.quantity > 1 ? "s" : ""} restant${
                      data.quantity > 1 ? "s" : ""
                    }`}
              </AnyText>
              <AnyText width="50">{data?.price ?? "??? "}€</AnyText>
            </AnyDiv>
            <AnyText width="80">{data?.specs ?? "default_specs"}</AnyText>
          </ArticleContainer>
        </>
      );
    case false:
      return <AnyText width="80">{errorMsg}</AnyText>;
    default:
      <ArticleContainer>
        <AnyText width="80">
          There is an unrecognized error, good luck !
        </AnyText>
      </ArticleContainer>;
  }
}
