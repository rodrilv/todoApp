import { useState } from "react";
import {
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { getLocalStorageId } from "../../helpers/getLocalStorageId";
import { updateTodo } from "../../services";

export const UpdateTodo = ({ id, user_id, getTodos, handleClose }: any) => {
  const [loading, setLoading] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    _id: id,
    title: "",
    content: "",
    date: new Date(),
    priority: "",
    user_id: user_id,
  });

  async function saveUpdatesTodo() {
    setLoading(true);
    if (validateTodo()) {
      await updateTodo(updatedTodo, handleClose);
      await getTodos(getLocalStorageId());
    } else {
      Swal.fire({
        title: "Uno o más de los campos están vacíos!",
        text: "Verifica que hayas llenado bien los campos",
        icon: "question",
      });
    }
    setLoading(false);
  }

  function validateTodo(): boolean {
    if (!updatedTodo.title && !updatedTodo.content && !updatedTodo.priority) {
      return false;
    }
    return true;
  }

  function handleOnChangeTitle({ target }: any) {
    setUpdatedTodo({
      ...updatedTodo,
      title: target.value,
    });
  }
  function handleOnChangeDescription({ target }: any) {
    setUpdatedTodo({
      ...updatedTodo,
      content: target.value,
    });
  }
  function handleOnChangePriority({ target }: any) {
    setUpdatedTodo({
      ...updatedTodo,
      priority: target.value,
    });
  }
  return (
    <div
      style={{ backgroundColor: "#2c2c2c", marginTop: "120px" }}
      className="todo-container"
    >
      <TextField
        onChange={handleOnChangeTitle}
        label="Título"
        variant="outlined"
      />
      <hr />
      <TextField
        onChange={handleOnChangeDescription}
        label="Descripción"
        variant="outlined"
      />
      <hr />
      <InputLabel id="priority-label">Prioridad</InputLabel>
      <Select
        labelId="priority-label"
        id="priority"
        value={updatedTodo.priority}
        label="Prioridad"
        onChange={handleOnChangePriority}
      >
        <MenuItem value={"Alta"}>Alta</MenuItem>
        <MenuItem value={"Media"}>Media</MenuItem>
        <MenuItem value={"Baja"}>Baja</MenuItem>
      </Select>

      {loading ? (
        <Button disabled={true} variant="contained">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </Button>
      ) : (
        <Button
          onClick={saveUpdatesTodo}
          variant="contained"
          endIcon={<EditIcon />}
        >
          Actualizar TODO
        </Button>
      )}
      <Button
        style={{ marginTop: 20 }}
        variant="outlined"
        onClick={handleClose}
      >
        Cerrar
      </Button>
    </div>
  );
};
