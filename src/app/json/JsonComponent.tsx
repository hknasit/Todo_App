import axios from "axios";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

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
    <tr>
      {mode ? (
        <>
          <td>
          <TextField id="standard-basic" variant="standard" value={todo1.name} onChange={(input) =>
                setTodo((todo) => {
                  return { ...todo, name: input.target.value };
                })} />
           
          </td>
          <td>
            <Checkbox
              checked={todo1.completed}
              onChange={(input) =>
                setTodo((todo) => {
                  return { ...todo, completed: input.target.checked };
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td style={{ width: "200px" }}>{todo.name}</td>
          <td>
            <Checkbox disabled checked={todo.completed} />
          </td>
        </>
      )}
      <td>
        {mode ? (
          <>
            <Button onClick={onSave}>Save</Button>
            <Button onClick={onDelete}>Delete</Button>
          </>
        ) : (
          <Button onClick={() => setMode(true)}>Edit</Button>
        )}
      </td>
    </tr>
  );
}
