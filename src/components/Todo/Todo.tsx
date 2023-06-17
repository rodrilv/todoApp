import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { Todo } from "../../interfaces/todo.interface";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Todo.css";
import { UpdateTodo } from "..";

export function TodoComponent({
  _id,
  title,
  content,
  date,
  priority,
  user_id,
  getTodos,
}: Todo) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <p />
          </div>
        </div>
        <div className="actions">
          <Button style={{ marginTop: 10, width: 160 }} variant="outlined">
            <DeleteIcon />
          </Button>
          <Button
            onClick={handleOpen}
            style={{ marginTop: 30, width: 160 }}
            variant="outlined"
          >
            <EditIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
