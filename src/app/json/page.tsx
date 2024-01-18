'use client'
import React from 'react'
import useSWR from 'swr'

const fetcher = (...args:any) => fetch(...args).then((res) => res.json())
export default function page() {
  const { data, error, isLoading } = useSWR('/api/jsonfile', fetcher)
  return (
    <>
    
    <div>{JSON.stringify(isLoading) }</div>
    <div>{JSON.stringify(data)}</div>
    <div>{JSON.stringify(error)}</div>

    </>

  )
}
