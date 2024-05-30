"use client"
import React from 'react'
import { useAddTask } from '@/hooks/useAddTask'

export default function Button(){
    const open = useAddTask((state)=>state.onOpen)
    return(
    <button onClick={open} className='
        text-whiteprime
        font-semibold
        bg-purple
        rounded-full
        h-[30px]
        md:h-[50px]
        lg:h-[50px]
        flex
        items-center
        px-5
        cursor-pointer
        hover:bg-lightpurple
    '>
        + <a className='hidden md:inline lg:inline'>Add New Task</a> 
    </button> 
    )
}