"use client";
import axios from "axios";
import React, { EventHandler, useEffect, useState } from "react";
import JsonComponent from "./JsonComponent";
import { Button, Stack, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

type todo = {
  id: number;
  name: string;
  completed: boolean;
};

export default function page() {
  const [todos, setTodos] = useState<todo[]>([]);
  const [newTodo, setNewTodo] = useState<todo>({
    name: "",
    completed: false,
    id: 0,
  });

  useEffect(() => {
    axios.get("/api/jsonfile").then((data) => setTodos([...data.data]));
  }, []);

  async function todoChange(modifiedTodo: todo) {
    const response = await axios.post("/api/jsonfile", modifiedTodo);
    if (response.data.status == true) {
      const newTodos = todos.map((todo) => {
        if (todo.id == modifiedTodo.id) {
          return modifiedTodo;
        } else {
          return todo;
        }
      });
      setTodos(newTodos);
    }
  }

  async function deleteTodo(todo: todo) {
    const response = await axios.delete(`/api/jsonfile/?id=${todo.id}`);
    if (response.data.status) {
      const newTodos = todos.filter((Oldtodo) => {
        if (Oldtodo.id == todo.id) {
          return false;
        } else {
          return true;
        }
      });
      setTodos(newTodos);
    }
  }
  async function addNew() {
    const response = await axios.post("/api/jsonfile", newTodo);
    const todo = response.data.data;
    if (response.data.status == true) {
      const newTodos = [...todos, todo];
      setTodos(newTodos);
    }
  }
  return (
    <>
      <Stack direction={"column"} alignItems={"center"}>
        <div style={{margin:"20px", alignItems:"center", alignContent:"center", display:"flex"}}>
          <TextField
          style={{marginRight:"10px"}}
            id="filled-basic"
            label="New Todo Details"
            variant="filled"
            value={newTodo.name}
            onChange={(e) =>
              setNewTodo((old) => {
                return { ...old, name: e.target.value };
              })
            }
          />

          <Button onClick={addNew}>Save</Button>
        </div>
        <table>
          <thead>
            <tr>
              <td style={{ width: "200px", fontWeight: "bold" }}>Details</td>
              <td style={{ width: "200px", fontWeight: "bold" }}>Completed</td>
              <td style={{ width: "200px", fontWeight: "bold" }}>Action</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <JsonComponent
                  key={todo.id}
                  todo={todo}
                  todoChange={todoChange}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </tbody>
        </table>
      </Stack>
    </>
  );
}
