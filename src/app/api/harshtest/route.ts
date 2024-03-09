import {NextRequest, NextResponse} from 'next/server';

export function GET(){
        return new Promise((resolve, reject) => {
            return resolve(NextResponse.json({data:"This is testing message"})  )
        })
}