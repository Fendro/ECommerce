import React, { useEffect, useState } from "react";
import { AnyImage, AnyText, ArticleContainer, Linebreak } from "../styling";
import { serverURL } from "../../utils/serverURL";

export default function Product() {
  const [fetchRes, setFetchRes] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      let json;
      try {
        json = await fetch(serverURL("articles"), {
          method: "GET",
        }).then((response) => {
          return response.json();
        });
        setFetchRes(json.success);
        if (json.success) {
          // console.log(json.data);
          setData(json.data);
        } else {
          setErrorMsg(json.message);
        }
        console.log(json);
      } catch (e) {
        // console.log(e);
      }
    })();
  }, []);

  switch (fetchRes) {
    case "loading":
      return (
        <ArticleContainer>
          <AnyText width="80">
            La description est en cours de chargement, veuillez attendre la
            réponse du serveur
          </AnyText>
        </ArticleContainer>
      );
    case true:
      return (
        <>
          {data?.map((article, index) => (
            <ArticleContainer
              key={article._id ?? index}
              link={"/articles/" + article._id}
            >
              {article.images?.map((img, ind) => {
                return (
                  <img
                    alt="image article"
                    width="200px"
                    height="200px"
                    src={article.images[0]}
                  />
                );
              })}
              <Linebreak />
              <AnyText width="60">{article.name}</AnyText>
              <AnyText width="20">{article.price}€</AnyText>
            </ArticleContainer>
          ))}
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
