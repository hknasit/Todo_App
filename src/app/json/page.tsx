"use client";
import axios from "axios";
import React, { EventHandler, useEffect, useState } from "react";
import JsonComponent from "./JsonComponent";

type todo = {
  id: number;
  name: string;
  completed: boolean;
};

export default function page() {
  const [todos, setTodos] = useState<todo[]>([]);

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
    const response = await axios.delete(`/api/jsonfile/${todo.id}`);
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
  return (
    <>
      <div>
        {todos.map((todo) => {
          return (
            <JsonComponent key={todo.id} todo={todo} todoChange={todoChange} deleteTodo={deleteTodo} />
          );
        })}
      </div>
    </>
  );
}
