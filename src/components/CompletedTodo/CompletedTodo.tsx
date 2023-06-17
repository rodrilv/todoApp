import { Todo } from "../../interfaces/todo.interface";
import { Button } from "@mui/material";
import { getLocalStorageId } from "../../helpers/getLocalStorageId";
import { deleteTodo, getTodos } from "../../services";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import "./CompletedTodo.css";

export const CompletedTodo = ({
  _id,
  title,
  content,
  priority,
  date,
  status,
  setTodos,
}: Todo) => {
  async function confirmDeleteTodo() {
    Swal.fire({
      title: "¿De verdad quieres eliminar el TODO?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTodo(_id);
        await getTodos(getLocalStorageId(), setTodos);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  }

  return (
    <div style={{ opacity: 0.3 }} className="todo">
      <div>
        <div className="title-c">
          <h2 style={{ textDecoration: "line-through" }}>{title}</h2>
          {priority === "Alta" ? (
            <b className="alta-c">{`Prioridad: ${priority}`}</b>
          ) : priority === "Media" ? (
            <b className="media-c">{`Prioridad: ${priority}`}</b>
          ) : (
            <b className="baja-c">{`Prioridad: ${priority}`}</b>
          )}
        </div>

        <div className="content-c">
          <p style={{ textDecoration: "line-through" }}>{content}</p>
          <small>{date}</small>
          <p style={{ color: "green" }}>{status}</p>
        </div>
      </div>
      <div className="actions">
        <Button
          onClick={confirmDeleteTodo}
          style={{ marginTop: 10, width: 160 }}
          variant="outlined"
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};
