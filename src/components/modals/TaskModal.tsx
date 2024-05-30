"use client"
import React, { useEffect, useState } from 'react'
import IconCross from '../IconCross'
import { useTaskModal } from '@/hooks/useTaskModal'
import { Subtask } from '@/hooks/useSubTasks'
import Subtasks from '../subtasks/Subtasks'
import { useCols } from '@/hooks/useCols'


export default function TaskModal() {
    const cols = useCols((state)=>state.cols)
    const data = useTaskModal((state)=>state.data)
    const onClose = useTaskModal((state)=>state.onClose)
    const fieldClassName = "mt-2 dark:bg-blackprime border border-grayy rounded-md w-full h-[40px] focus:border-purple focus:outline-none pl-4"
    return (
        <>
        {data.isOpen? (
            <div onClick={onClose} className='
                h-full
                w-full
                bg-black 
                justify-center
                items-center
                flex
                overflow-x-hidden
                overflow-y-auto
                fixed
                inset-0
                z-40
                outline-none
                focus:outline-none
                bg-neutral-800
                bg-opacity-70 '>
               <div onClick={(e)=>e.stopPropagation()} className='bg-whiteprime dark:bg-blackprime 
               min-h-[200px] w-[500px] rounded-md p-8'>
                <div className='flex flex-col'>
                    <h1 className='font-bold dark:text-whiteprime text-xl'>{data.title}</h1>
                <p className='text-grayy mt-5 text-sm'>{data.description}</p>
                    <h2 className='font-bold text-grayy mt-5 mb-4'>Subtasks</h2>
                    {data.subtasks.map((subtask, index)=>(
                        <div className='mt-1' key={index}>
                            <Subtasks subtask={subtask}/>
                        </div>
                    ))}
                    <h2 className='mt-5 font-bold'>current status</h2>
                    <select className={fieldClassName} name="status" id="status">
                        <option value={data.status}>{data.status}</option>
                        {cols.filter((col)=>col.name!==data.status).map((col, index:number)=>(
                            <option key={index} value={`${col.id} ${col.name}`}>{col.name}</option>
                        ))}
                    </select>
                </div>
               </div> 
            </div>
        ):(
            null
        )}
        </>
    )
}

function AddFieldButton({onClick}:{onClick:React.MouseEventHandler<HTMLButtonElement>}){
    return(
        <button onClick={onClick} type = "button" className='w-full h-[40px] mt-[20px] rounded-full dark:bg-whiteprime
        dark:text-purple bg-purple text-whiteprime font-semibold'>+Add New Column</button>
    )
}

function SubmitButton(){
    return(
        <button type='submit' className='w-full h-[40px] mt-5 rounded-full bg-purple 
        text-whiteprime font-semibold'>Create New Board</button>
    )
}