import axios from "axios";
import Swal from "sweetalert2";

export async function updateTodo(updatedTodo: any, handleClose: any){
    try {
        await axios.put(`${import.meta.env.VITE_API_URL}updateTodo`, updatedTodo);
        Swal.fire({
          title: "Guardado con Éxito",
          icon: "success",
        });
        handleClose();
      } catch (error) {
        Swal.fire({
          title: "Hubo un error al guardar el TODO",
          icon: "warning",
        });
      }
}