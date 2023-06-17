import axios from "axios";
import Swal from "sweetalert2";

export async function deleteTodo(_id: string | undefined){
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}deleteTodo`, {
          id: _id,
        });
      } catch (error) {
        Swal.fire({
          title: "No se pudo eliminar el TODO",
          icon: "warning",
        });
      }
}