import { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { register } from "../../services";
import Swal from "sweetalert2";
import "./Register.css";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

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
      await register(setLoading, user);
    }
  }

  return (
    <div className="login-container">
      <h3>REGISTRO TODO App 🖊</h3>
      <TextField
        onChange={(e) => handleOnChangeUsername(e)}
        id="filled-basic"
        label="Username"
        variant="outlined"
      />
      <hr />
      <TextField
        onChange={(e) => handleOnChangePassword(e)}
        id="filled-basic"
        label="Password"
        variant="outlined"
      />
      <hr />
      {loading ? (
        <Button disabled={true} variant="contained">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </Button>
      ) : (
        <Button variant="contained" onClick={createUser}>
          Registrar
        </Button>
      )}
      <Link className="register-link" to={"/login"}>
        ¿Ya tienes un usuario? Log In
      </Link>
    </div>
  );
};
