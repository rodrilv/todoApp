import axios from "axios";
import Swal from "sweetalert2";

export async function getTodosByPriority(_id: string | null ,priority: string, setTodos?: any | void){
    try {
        await axios
          .get(`${import.meta.env.VITE_API_URL}getTodosByPriority/${_id}/${priority}`)
          .then((todos) => setTodos(todos["data"].todos));
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "No se pudieron obtener los TODO's",
          icon: "warning",
        });
      }
}