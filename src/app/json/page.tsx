"use client";
import axios from "axios";
import React, { EventHandler, useEffect, useState } from "react";
import useSWR from "swr";

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

  function nameChange(input: any) {
    const newTodos = todos.map((todo) => {
      if (todo.id == input.target.id) {
        return { ...todo, name: input.target.value };
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  }

  function completedChange(input:any) {
    const newTodos = todos.map((todo) => {
      if (todo.id == input.target.id) {
        return { ...todo, completed: input.target.checked };
      } else {
        return todo;
      }
    });

    setTodos(newTodos)
  }
  return (
    <>
      <div>
        {todos.map((todo) => {
          return (
            <div id={todo.id.toString()}>
              <input
                type="text"
                value={todo.name}
                onChange={nameChange}
                id={todo.id.toString()}
              />
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id.toString()}
                onChange={completedChange}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
