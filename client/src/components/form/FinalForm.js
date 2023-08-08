import axios from "axios";
import { serverURL } from "../../utils/serverURL";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .post(serverURL("/orders"), requestData)
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  const requestData = {
    user_id: user._id,
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
