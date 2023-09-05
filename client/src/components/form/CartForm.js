import ReactModal from "react-modal";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TopCenterContainer } from "../styling";
import { UserContext } from "../../context/UserContext";
import { ArticleContext } from "../../context/ArticleContext";

ReactModal.setAppElement("body");

export default function CartForm() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const storedPackages = JSON.parse(localStorage.getItem("packages")) || [];
  const articleContext = useContext(ArticleContext);

  return (
    <>
      <TopCenterContainer>
        <h1>Liste des articles</h1>
      </TopCenterContainer>
      {storedPackages.map((pkg, packageIndex) => (
        <div key={`package_${packageIndex}`}>
          {pkg.articles.map((articleInCart, articleIndex) => {
            const articleInfo =
              articleContext.article[articleInCart.article_id];
            console.log(articleInCart);
            const articleImage = articleInCart?.articleImage;
            return (
              <TopCenterContainer key={`article_${articleIndex}`}>
                {articleImage && (
                  <img
                    width="70"
                    src={articleImage}
                    alt={`Image de ${
                      articleInfo?.name ?? articleInCart.articleName
                    }`}
                  />
                )}
                <h2>
                  Nom de l'article:{" "}
                  {articleInfo?.name ?? articleInCart.articleName}
                </h2>
                <p>Quantité: {articleInCart.quantity}</p>
              </TopCenterContainer>
            );
          })}
        </div>
      ))}
      {Object.keys(user).length ? (
        <TopCenterContainer>
          <Button
            variant="outlined"
            color="success"
            onClick={() => navigate("/deliveryForUser")}
          >
            Commander
          </Button>
        </TopCenterContainer>
      ) : (
        <TopCenterContainer>
          <Button
            variant="outlined"
            color="success"
            onClick={() => setIsOpen(true)}
          >
            Commander
          </Button>
        </TopCenterContainer>
      )}
      <ReactModal
        isOpen={isOpen}
        contentLabel="Test"
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "600px",
            height: "50px",
            margin: "0 auto",
            border: "none",
            borderRadius: "8px",
            overflow: "auto",
            top: "50%",
            left: "35%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{ width: "45%", marginRight: "10px" }}
            variant="outlined"
            color="success"
            onClick={() => {
              navigate("/delivery");
            }}
          >
            Continuer en tant qu'invité
          </Button>
          <Button
            style={{ width: "45%" }}
            variant="outlined"
            color="success"
            onClick={() => {
              navigate("/login");
            }}
          >
            Se connecter
          </Button>
        </div>
      </ReactModal>
    </>
  );
}
