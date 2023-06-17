import { Todo } from "../interfaces/todo.interface";
import axios from "axios";
import Swal from "sweetalert2";

export async function createTodo(newTodo: Todo){
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}createTodo`, newTodo);
        Swal.fire({
          title: "Guardado con Éxito",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Hubo un error al guardar el TODO",
          icon: "warning",
        });
      }
}