import { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Register.css";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleOnChangeUsername({ target }: any) {
    setUser({
      ...user,
      username: target.value,
    });
  }

  function handleOnChangePassword({ target }: any) {
    setUser({
      ...user,
      password: target.value,
    });
  }

  async function register() {
    try {
      setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_API_URL}register`, user)
        .then((response) => {
          setLoading(false);
          Swal.fire({
            title: "Registro Exitoso!",
            icon: "success",
          });
          navigate("/login");
          console.log(response);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: "No se pudo registrar el usuario",
        text: "Intenta nuevamente",
        icon: "error",
      });
    }
  }

  function validateInputs(): boolean {
    if (!user.username && !user.password) {
      Swal.fire({
        title: "No hay datos!",
        text: "Verifica los campos!",
        icon: "warning",
      });
      return false;
    }
    return true;
  }

  async function createUser() {
    if (validateInputs()) {
      await register();
    }
  }

  return (
    <div className="login-container">
      <h3>Registration TODO App 🖊</h3>
      <TextField
        onChange={(e) => handleOnChangeUsername(e)}
        id="filled-basic"
        label="Username"
        variant="outlined"
      />
      <TextField
        onChange={(e) => handleOnChangePassword(e)}
        id="filled-basic"
        label="Password"
        variant="outlined"
      />
      {loading ? (
        <Button disabled variant="contained">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </Button>
      ) : (
        <Button variant="contained" onClick={createUser}>
          Register User
        </Button>
      )}
      <Link className="register-link" to={"/login"}>
        ¿Already an account? Log In
      </Link>
    </div>
  );
};
