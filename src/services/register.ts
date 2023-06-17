import { User } from '../interfaces/user.interface';
import axios from 'axios'
import Swal from 'sweetalert2';

export async function register(setLoading: any, user: User) {
    try {
      setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_API_URL}register`, user)
          Swal.fire({
            title: "Registro Exitoso!",
            icon: "success",
        });
        setLoading(false);
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