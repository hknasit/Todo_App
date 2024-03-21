import axios from "axios";
import React, { useState } from "react";
type todo = {
  id: number;
  name: string;
  completed: boolean;
};
export default function JsonComponent({ todo }: { todo: todo }) {
  const [mode, setMode] = useState<boolean>(false);

  function nameChange(oldTodo: todo, name: string) {
    const newTodo = { ...oldTodo, name: name };
    axios.post("api/jsonfile", { ...newTodo }).then((data) => {
      if (data.data.status) {
        alert(data.data.message);
      }
    });
  }
  return (
    <div>
      {mode ? (
        <>
          <input
            type="text"
            value={todo.name}
            onBlur={(input) => nameChange(todo, input.target.value)}
          />
          <input type="checkbox" checked={todo.completed} />
        </>
      ) : (
        <>
          <b />
          {todo.name} <b />
          <input type="checkbox" checked={todo.completed} />
        </>
      )}

      <button onClick={() => setMode(true)}>Edit</button>
      <button onClick={() => setMode(false)}>Save</button>
    </div>
  );
}
