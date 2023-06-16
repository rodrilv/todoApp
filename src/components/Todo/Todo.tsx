import { Todo } from "../../interfaces/todo.interface";
import "./Todo.css";

export function TodoComponent({
  title,
  content,
  date,
  priority,
  username,
}: Todo) {
  return (
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
          <small>{username}</small>
        </div>
      </div>
    </div>
  );
}
