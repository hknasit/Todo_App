import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { resolve } from "path";

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

export function POST() {
    return new Promise((resolve, reject) => {

    })
}
