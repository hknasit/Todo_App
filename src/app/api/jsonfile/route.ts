import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

type todo = {
  id: number;
  name: string;
  completed: boolean;
};

const FILEPATH: string = process.cwd() + "/src/json/todos.json";

export function GET() {
  return new Promise((resolve, reject) => {
    try {
      const file = fs.readFile(FILEPATH, (err, data) => {
        if (err) return reject(NextResponse.json(err));

        return resolve(NextResponse.json(JSON.parse(data.toString())));
      });
    } catch (error: any) {
      NextResponse.json(error);
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const requestObject:todo = await request.json();

    const todos:todo[] = JSON.parse(fs.readFileSync(FILEPATH, "utf-8"));

    const istodo = todos.filter((todo:todo) => todo.id == requestObject.id);
    if(istodo[0]){

      const newTodos = todos.map((todo: todo) => {
        if (todo.id == requestObject.id) {
          return requestObject;
        } else {
          return todo;
        }
      });
  
  
      fs.writeFileSync(FILEPATH, JSON.stringify(newTodos));
      return NextResponse.json(
        { message: "todo has bing change", status: true },
        { status: 200 }
      );
    }else{
      const newTodos = [...todos, {...requestObject, id:todos[todos.length-1].id+1}];
      fs.writeFileSync(FILEPATH, JSON.stringify(newTodos));
      return NextResponse.json(
        { message: "todo has bing added", status: true, data:{...requestObject, id:todos.length+1}  },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", status: false },
      { status: 404 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: number = Number.parseInt(searchParams.get("id") ?? "0");
    

    const oldTodos = JSON.parse(fs.readFileSync(FILEPATH, "utf-8"));
    const newTodos = oldTodos.filter((todo: todo) => {
      if (id == todo.id) {
        return false;
      } else {
        return true;
      }
    });

    fs.writeFileSync(FILEPATH, JSON.stringify(newTodos));
    return NextResponse.json(
      { status: true, message: "todo delete" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Id not found", status: false },
      { status: 404 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const newTodo = await request.json();
    const oldTodos = JSON.parse(fs.readFileSync(FILEPATH, "utf-8"));
    const newTodos = [oldTodos, ...newTodo];
    fs.writeFileSync(FILEPATH, JSON.stringify(newTodos));

    return NextResponse.json(
      { status: true, message: "new todo added" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "data not inserted" },
      { status: 500 }
    );
  }
}
