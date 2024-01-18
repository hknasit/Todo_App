
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs'
import path from "path";
 
export  function GET() {

    return  new Promise( (resolve, reject) => {
        try {
            // path.join()
           var filePath = path.join(__dirname, '../../../json/todos.json');
           fs.readFile(filePath, (err,data) => {
            if(err) resolve(NextResponse.json({message:err}))
            
                resolve( NextResponse.json({message:data}))
            })
        } catch (error:any) {
            console.log("in the json error file");

        }
    })
    
}