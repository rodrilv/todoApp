import { User } from '../interfaces/user.interface';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export async function register(setLoading: any, user: User) {
    const navigate = useNavigate();
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