import axios from "axios";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import React, { useEffect, useState } from "react";
import { serverURL } from "../../utils/serverURL";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TopCenterContainer } from "../styling";

export default function Admin() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setFetched(false);

    axios
      .get(serverURL(`admin/users/`), { withCredentials: true })
      .then((response) => {
        const { data } = response;

        if (data.success) {
          setData(data.data);
          setFetched(true);
        }
      })
      .catch((error) => {
        setData([]);
        setFetched(true);
        console.error(error.response.data);
      });
  }, [reload]);

  const handleDelete = (id) => {
    axios
      .delete(serverURL(`admin/users/${id}`))
      .then((response) => {
        const { data } = response;

        if (data.success) setReload(!reload);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEdit = (id) => {
    navigate(`/admin/change/${id}`);
  };

  if (!fetched) return <h1>Récupération de la liste des utilisateurs...</h1>;

  if (!data.length) return <h1>Pas d'utilisateurs.</h1>;

  if (data.length)
    return (
      <>
        <TopCenterContainer>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              navigate("/admin/addArticle");
            }}
          >
            <PostAddRoundedIcon />
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              navigate("/admin/addUser");
            }}
          >
            <PersonAddAlt1RoundedIcon />
          </Button>
        </TopCenterContainer>
        <TopCenterContainer>
          <table>
            <tbody>
              <tr>
                <th>username</th>
                <th>email</th>
              </tr>
              {data?.map((admin, key) => (
                <tr key={key}>
                  <td>{admin?.username ?? "default_username"}</td>
                  <td>{admin?.email ?? "default_email"}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(admin?._id)}
                    >
                      <DeleteRoundedIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(admin?._id)}
                    >
                      <EditRoundedIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TopCenterContainer>
      </>
    );
}
