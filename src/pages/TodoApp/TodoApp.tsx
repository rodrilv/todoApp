import { useState, useEffect } from "react";
import { getLocalStorageUser } from "../../helpers/getLocalStorageUser";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { TodoComponent } from "../../components";
import { Todo } from "../../interfaces/todo.interface";
import { getLocalStorageId } from "../../helpers/getLocalStorageId";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Swal from "sweetalert2";
import "./TodoApp.css";
import { getTodos } from "../../services";

export const TodoApp = () => {
  const [user, setUser] = useState(getLocalStorageUser());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    id: "",
    title: "",
    content: "",
    date: new Date(),
    priority: "",
    user_id: getLocalStorageId(),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createTodo() {
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

  async function saveTodo() {
    if (validateTodo()) {
      await createTodo();
      await getTodos(getLocalStorageId(), setTodos);
    } else {
      Swal.fire({
        title: "Uno o más de los campos están vacíos!",
        text: "Verifica que hayas llenado bien los campos",
        icon: "question",
      });
    }
  }

  function validateTodo() {
    if (!newTodo.title && !newTodo.content && !newTodo.priority) {
      return false;
    }
    return true;
  }

  function handleOnChangeTitle({ target }: any) {
    setNewTodo({
      ...newTodo,
      title: target.value,
    });
  }
  function handleOnChangeDescription({ target }: any) {
    setNewTodo({
      ...newTodo,
      content: target.value,
    });
  }
  function handleOnChangePriority({ target }: any) {
    setNewTodo({
      ...newTodo,
      priority: target.value,
    });
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getTodos(getLocalStorageId(), setTodos);
  }, []);

  return (
    <div>
      <div className="todo-container">
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
          value={newTodo.priority}
          label="Prioridad"
          onChange={handleOnChangePriority}
        >
          <MenuItem value={"Alta"}>Alta</MenuItem>
          <MenuItem value={"Media"}>Media</MenuItem>
          <MenuItem value={"Baja"}>Baja</MenuItem>
        </Select>

        {loading ? (
          <Button disabled variant="contained">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </Button>
        ) : (
          <Button onClick={saveTodo} variant="contained" endIcon={<SendIcon />}>
            Guardar TODO
          </Button>
        )}
      </div>
      <div>
        {todos &&
          todos.map((todo) => {
            todo = { ...todo, getTodos: getTodos };
            return <TodoComponent {...todo} key={todo._id}></TodoComponent>;
          })}
      </div>
    </div>
  );
};
