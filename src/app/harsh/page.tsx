'use client'
import React, { useEffect } from 'react'
import useSwr from 'swr'
const fetcher = (...args:any) => fetch(...args)

export default  function page() {
    useEffect( () => {
        fetch('/api/harshtest').then((data) => data.json()).then((data) => console.log(data))
    },[])
  return (
    <div>
        Harsh Test Page
        
 
      
    </div>
  )
}
