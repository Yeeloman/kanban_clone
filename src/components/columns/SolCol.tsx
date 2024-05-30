"use client"
import React, { useEffect } from 'react'
import { useTasks } from '@/hooks/useTasks'
import TaskCard from '../tasks/TaskCard'

type solColProps = {
    name : string 
    colId : number
}


export default function SolCol({name, colId}: solColProps) {
  const tasks = useTasks((state)=>state.tasks)
  return (
    <div className='mr-80'>
        <h2 className='text-grayy font-semibold'>
            {name}
        </h2>
        <div>
          {tasks.map((task)=>(
            task.columnId === colId ? (
              <div key={task.id} className='flex flex-col mr-[-320px]'>
                <TaskCard task={task}/>
              </div>
            ) : (
              null
            )
          ))}
        </div>
    </div>
  )
}
