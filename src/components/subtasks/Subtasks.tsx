"use client"
import React from 'react'
import { Subtask } from '@/hooks/useSubTasks'
import { useSubTasks } from '@/hooks/useSubTasks'

type subtaskProps = {
    subtask : Subtask
}
export default function Subtasks({subtask}:subtaskProps) {
  const subs = useSubTasks((state)=>state.subtasks)
  const getSubDone = useSubTasks((state)=>state.setSubTaskDone) 

  function handleChange(){
    getSubDone(subs.filter((sub)=>sub.id === subtask.id)[0].isCompleted, subtask.id)
  }
  return (
    <div>
        <div className='dark:bg-[rgba(35,36,47,255)] bg-whitesecond hover:bg-lightpurple flex items-center p-1 mb-1 text-[0.8rem] rounded-md min-h-[2.5rem] w-[27rem]'>
            <label className='flex flex-row'>
                <input
                    type="checkbox"
                    name="myCheckbox"
                    checked = {subs.filter((sub)=>sub.id === subtask.id)[0].isCompleted}
                    onChange={handleChange}
                    className='m-1'
                    />
                    <div className={`${subs.filter((sub)=>sub.id === subtask.id)[0].isCompleted? 'line-through text-[rgba(123,140,162,255)]' : ''} ml-3 font-semibold `}>{subtask.title}</div>
            </label>
        </div>
    </div>
  )
}
