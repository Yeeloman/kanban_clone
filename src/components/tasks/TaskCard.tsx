"use client"
import React, { useEffect, useState } from 'react'
import { Task } from '@/hooks/useTasks'
import { useSecondSubs } from '@/hooks/useSecondSubs'
import { Subtask, useSubTasks } from '@/hooks/useSubTasks'
import { useTaskModal } from '@/hooks/useTaskModal'

type TaskCardProps = {
    task : Task
}


export default function TaskCard( { task } : TaskCardProps) {
  const onOpen = useTaskModal((state)=>state.onOpen)
  const subtasks = useSubTasks((state)=>state.subtasks)
  const [done, setDone] = useState<number>(0)
  const [undone, setUndone] = useState<number>(0)
  const [subsOfTask, setSubsOfTask] = useState<Subtask[]>([])
  function setRelatedSubs(){
    const relatedSubs = subtasks.filter((sub:Subtask)=>{
      return sub.taskId == task.id
    }) 
    setSubsOfTask(relatedSubs)
  }
  function subIsDone(){
    const doneSubs = subtasks.filter((sub:Subtask)=>{
      return sub.isCompleted === true && sub.taskId === task.id
    })
    setDone(doneSubs.length)
  }
  function subIsUndone(){
    const doneSubs = subtasks.filter((sub:Subtask)=>{
      return sub.taskId === task.id
    })
    setUndone(doneSubs.length)
  }
  useEffect(()=>{
    subIsDone()
    subIsUndone()
    setRelatedSubs()
  }, [subtasks])

  function handleOpen(taskId: number, title : string, description : string, subtasks: Subtask[], status:string){
    onOpen(taskId, title, description, subtasks, status)
  }
  return (
    <div onClick={()=>{
      handleOpen(task.id, task.title, task.description, subsOfTask, task.status) 
    }} className='p-3 mt-5 w-80 min-h-20 bg-whiteprime dark:bg-blackprime 
    flex flex-col rounded-md cursor-pointer hover:text-purple shadow-md'>
        <h1 className='font-semibold'>
            {task.title}
        </h1>
        <p className='text-grayy font-semibold text-sm mt-2'>{done} of {undone} subtasks </p>
    </div>
  )
}
