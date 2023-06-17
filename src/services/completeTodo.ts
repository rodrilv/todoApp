import axios from "axios";
import Swal from "sweetalert2";

export async function completeTodo(id: string | undefined, user_id: string | null){
    try {
        await axios.put(`${import.meta.env.VITE_API_URL}completeTodo/${id}`, {status: 'Completado', user_id: user_id});
        Swal.fire({
          title: "TODO Completado",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Hubo un error completar el TODO",
          icon: "warning",
        });
      }
}