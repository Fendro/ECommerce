import axios from "axios";
import { serverURL } from "../../utils/serverURL";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const { user } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    console.log(requestData);
    axios
      .post(serverURL("/orders"), requestData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  const requestData = {
    user_id: "64d1fde0d5ec9a84f07dfde8",
    packages: {
      articles: [
        {
          article: "64d20169d5ec9a84f07dfdea",
          quantity: 2,
        },
        {
          article: "64d2016dd5ec9a84f07dfdeb",
          quantity: 6,
        },
      ],
    },
  };

  return null;
}
