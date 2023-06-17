import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorageUser } from "../../helpers/getLocalStorageUser";
import { getLocalStorageId } from "../../helpers/getLocalStorageId";
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
import { createTodo, getTodos, getTodosByPriority } from "../../services";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import "./TodoApp.css";
import { CompletedTodo } from "../../components/CompletedTodo/CompletedTodo";

export const TodoApp = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState({
    _id: "",
    title: "",
    content: "",
    date: `${new Date()}`,
    priority: "",
    status: "",
    user_id: getLocalStorageId(),
  });

  async function saveTodo() {
    if (validateTodo()) {
      setLoading(true);
      await createTodo(newTodo);
      await getTodos(getLocalStorageId(), setTodos);
      setLoading(false);
    } else {
      Swal.fire({
        title: "Uno o más de los campos están vacíos!",
        text: "Verifica que hayas llenado bien los campos",
        icon: "question",
      });
    }
  }

  async function handleGetTodosByPriority(priority: string) {
    setLoading(true);
    await getTodosByPriority(getLocalStorageId(), priority, setTodos);
    setLoading(false);
  }

  function validateTodo() {
    if (!newTodo.title || !newTodo.content || !newTodo.priority) {
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

  function logout() {
    Swal.fire({
      title: "Sesión cerrada",
      icon: "success",
    });
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    if (!getLocalStorageUser()) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getTodos(getLocalStorageId(), setTodos);
  }, []);

  return (
    <div>
      <div className="todo-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
          }}
        >
          <Button onClick={logout}>
            <PowerSettingsNewIcon />
          </Button>
        </div>
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
        <InputLabel style={{ color: "#ffffff" }} id="priority-label">
          Prioridad
        </InputLabel>
        <Select
          style={{ color: "#ffffff" }}
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
          <Button style={{ marginTop: 10 }} disabled={true} variant="contained">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </Button>
        ) : (
          <Button
            style={{ marginTop: 10 }}
            onClick={saveTodo}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Guardar TODO
          </Button>
        )}
        <hr />
        <p>Filtrar por Prioridad</p>
        <div className="filter-container">
          <Button
            onClick={() => getTodos(getLocalStorageId(), setTodos)}
            disabled={loading}
          >
            Todos
          </Button>
          <Button
            onClick={() => handleGetTodosByPriority("Alta")}
            disabled={loading}
          >
            ALTA
          </Button>
          <Button
            onClick={() => handleGetTodosByPriority("Media")}
            disabled={loading}
          >
            MEDIA
          </Button>
          <Button
            onClick={() => handleGetTodosByPriority("Baja")}
            disabled={loading}
          >
            BAJA
          </Button>
        </div>
      </div>
      <div>
        {todos &&
          todos.map((todo) => {
            todo = { ...todo, setTodos: setTodos };
            if (todo.status === "Pendiente") {
              return <TodoComponent {...todo} key={todo._id}></TodoComponent>;
            }
            return <CompletedTodo {...todo} key={todo._id} />;
          })}
      </div>
    </div>
  );
};
