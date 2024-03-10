import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

type todo = {
    id: number;
    name: string;
    completed: boolean;
  };

export function GET() {
  return new Promise((resolve, reject) => {
    try {
      const file = fs.readFile(
        process.cwd() + "/src/json/todos.json",
        (err, data) => {
          if (err) return reject(NextResponse.json(err));

          return resolve(NextResponse.json(JSON.parse(data.toString())));
        }
      );
    } catch (error: any) {
      NextResponse.json(error);
    }
  });
}

export async function POST(request:NextRequest) {
    
  try {
    const requestObject = await request.json();
    const newTodo = requestObject;
    const todos = JSON.parse(fs.readFileSync(process.cwd()+'/src/json/todos.json', 'utf-8'));

    const newTodos = todos.map((todo:todo) => {
      if(todo.id == newTodo.id){
        return newTodo;
      }else {
        return todo
      }
    })

    fs.writeFileSync(process.cwd()+'/src/json/todos.json', JSON.stringify(newTodos));
    return NextResponse.json("todo has bing change")
  } catch (error) {
    return NextResponse.error();
  }

   
    
}
