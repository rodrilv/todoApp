import { TextField, Button, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createLocalStorageUser } from "../../helpers/createLocalStorageUser";
import Swal from "sweetalert2";
import "./Login.css";
import { createLocalStorageId } from "../../helpers/createLocalStorageId";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login() {
    try {
      setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_API_URL}login`, {
          username: user,
          password: password,
        })
        .then((response) => {
          setLoading(false);
          createLocalStorageUser(response["data"].user["username"]);
          createLocalStorageId(response["data"].user["_id"]);
          navigate("/", { replace: true });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: "No se pudo iniciar sesión",
        text: "Verifica los datos",
        icon: "error",
      });
    }
  }

  return (
    <div className="login-container">
      <h3>TODO App 🖊</h3>
      <TextField
        className="input-fields"
        label="Username"
        variant="outlined"
        onChange={(e) => setUser(e.target.value)}
      />
      <TextField
        className="input-fields"
        label="Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading ? (
        <Button disabled variant="contained">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </Button>
      ) : (
        <Button variant="contained" onClick={login}>
          Log In
        </Button>
      )}

      <Link className="register-link" to={"/register"}>
        Register
      </Link>
    </div>
  );
};
