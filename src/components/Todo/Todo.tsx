import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { Todo } from "../../interfaces/todo.interface";
import { UpdateTodo } from "..";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Todo.css";
import { getLocalStorageId } from "../../helpers/getLocalStorageId";
import { deleteTodo, completeTodo, getTodos } from "../../services";

export function TodoComponent({
  _id,
  title,
  content,
  date,
  priority,
  user_id,
  setTodos,
  status,
}: Todo) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function confirmDeleteTodo() {
    Swal.fire({
      title: "¿De verdad quieres eliminar el TODO?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
      confirmButtonColor: "red",
      denyButtonColor: "green",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTodo(_id);
        await getTodos(getLocalStorageId(), setTodos);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  }

  async function confirmCompleteTodo() {
    Swal.fire({
      title: "¿Deseas marcar como completado el TODO?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
      confirmButtonColor: "green",
      denyButtonColor: "gray",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await completeTodo(_id, user_id);
        await getTodos(getLocalStorageId(), setTodos);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <UpdateTodo
            id={_id}
            user_id={user_id}
            getTodos={getTodos}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <div className="todo">
        <div>
          <div className="title">
            <h2>{title}</h2>
            {priority === "Alta" ? (
              <b className="alta">{`Prioridad: ${priority}`}</b>
            ) : priority === "Media" ? (
              <b className="media">{`Prioridad: ${priority}`}</b>
            ) : (
              <b className="baja">{`Prioridad: ${priority}`}</b>
            )}
          </div>

          <div className="content">
            <p>{content}</p>
            <small>{date}</small>
            <p>{status}</p>
            <p />
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
          <Button
            onClick={handleOpen}
            style={{ marginTop: 30, width: 160 }}
            variant="outlined"
          >
            <EditIcon />
          </Button>
          <Button
            style={{ marginTop: 30, width: 160 }}
            onClick={confirmCompleteTodo}
          >
            COMPLETAR
          </Button>
        </div>
      </div>
    </>
  );
}
