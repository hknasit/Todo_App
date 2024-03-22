import axios from "axios";
import React, { useState } from "react";
type todo = {
  id: number;
  name: string;
  completed: boolean;
};
export default function JsonComponent({
  todo,
  todoChange,
  deleteTodo,
}: {
  todo: todo;
  todoChange: (todo: todo) => {};
  deleteTodo: (todo: todo) => {};
}) {
  const [mode, setMode] = useState<boolean>(false);
  const [todo1, setTodo] = useState(todo);

  function onSave() {
    todoChange(todo1);
    setMode(false);
  }
  function onDelete() {
    deleteTodo(todo1);
  }
  return (
    <div>
      {mode ? (
        <>
          <input
            type="text"
            value={todo1.name}
            onChange={(input) =>
              setTodo((todo) => {
                return { ...todo, name: input.target.value };
              })
            }
          />
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            onClick={(input) =>
              setTodo((todo) => {
                //@ts-ignore
                return { ...todo, completed: input.target.checked };
              })
            }
          />
        </>
      ) : (
        <>
          <b />
          {todo.name} <b />
          <input type="checkbox" checked={todo.completed} />
        </>
      )}
      {mode ? (
        <>
          <button onClick={onSave}>Save</button>
          <button onClick={onDelete}>Delete</button>
        </>
      ) : (
        <button onClick={() => setMode(true)}>Edit</button>
      )}
    </div>
  );
}
