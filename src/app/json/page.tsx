"use client";
import axios from "axios";
import React, { EventHandler, useEffect, useState } from "react";

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

 async function nameChange(input: any, todo:todo) {

   const response = await axios.post('/api/jsonfile', {...todo, "name":input.target.value});
  if(response.status == 200){
  const newTodos=   todos.map((todo) => {
      if (todo.id == input.target.id) {
        return { ...todo, "name": input.target.value };
      } else {
        return todo;
      }

    })
    setTodos(newTodos)
  }
  }

  function completedChange(input:any, todo:todo) {
    axios.post('/api/jsonfile', {  ...todo, "completed":input.target.checked}).then((response) => console.log(response));
    

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
                onBlur={(input) => nameChange(input, todo)}
                id={todo.id.toString()}
              />
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id.toString()}
                onChange={(input) => completedChange(input, todo)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
