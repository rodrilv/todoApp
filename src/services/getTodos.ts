import axios from "axios";
import Swal from "sweetalert2";

export async function getTodos(_id: string | null, setTodos?: any | void){
    try {
        await axios
          .get(`${import.meta.env.VITE_API_URL}getTodos/${_id}`)
          .then((todos) => setTodos(todos["data"].todos));
      } catch (error) {
        Swal.fire({
          title: "No se pudieron obtener los TODO's",
          icon: "warning",
        });
      }
}