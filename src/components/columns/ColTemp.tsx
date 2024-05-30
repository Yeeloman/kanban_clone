"use client"
import React, { useEffect, useState } from 'react'
import { useCols } from '@/hooks/useCols'
import { getTheCols } from '@/_actions/cols'
import { useBoards } from '@/hooks/useBoards'
import SolCol from './SolCol'
import { getSpefTasks } from '@/_actions/tasks'
import { useTasks } from '@/hooks/useTasks'
import { getAllSubtasks, getSpefSubtasks } from '@/_actions/subtasks'
import { useSubTasks } from '@/hooks/useSubTasks'
import { Subtask } from '@/hooks/useSubTasks'
import { useSecondSubs } from '@/hooks/useSecondSubs'

export default function ColTemp() {
    const subtaks = useSubTasks((state)=>state.subtasks)
    const setSubtasks = useSubTasks((state)=>state.setSubTasks)
    const [spefSubtasks, setSpefSubtasks] = useState<Subtask[]>([])
    const tsks = useTasks((state)=>state.tasks)
    const setTasks = useTasks((state)=>state.setTasks)
    const cols = useCols((state)=>state.cols)
    const setCols = useCols((state)=>state.setCols)
    const boards = useBoards((state)=>state.boards)
    const getActBoardId = useBoards((state)=>state.getActive)
    const [actBoard, setActBoard] = useState<number>(0)
    async function getThemCols(){
        try {
            const res = await getTheCols(actBoard) 
            if (res){
               setCols(res) 
            }
        } catch (error) {
            console.log(error)
            return[]
        }
    }
    async function getTheTasks(){
        const colIds = cols.map((col)=>{
            return col.id
        })
        try {
            const tasks = await getSpefTasks(colIds) 
            if (tasks){
                setTasks(tasks)
            }
        } catch (error) {
            console.log(error) 
        }
    }
    async function getTheSubs(){
        const taskIds = tsks.map((task)=>{
            return task.id
        })
        if (taskIds.length>0){
            try {
                const res = await getSpefSubtasks(taskIds) 
                if (res){
                    setSubtasks(res)
                }
            } catch (error) {
                console.log(error) 
            }
        }
    }
    useEffect(()=>{
        setActBoard(getActBoardId)
    }, [boards])

    useEffect(()=>{
        getThemCols()
    }, [actBoard])
    
    useEffect(()=>{
        getTheTasks()
    }, [cols])

    useEffect(()=>{
        getTheSubs()
    }, [tsks])

    return (
        <div className='ml-10 fixed flex flex-row'>
            {cols.map((col)=>(
                <div key={col.id} className=''>
                    <SolCol name={col?.name} colId={col.id}/>
                </div>
            ))}
            <div className='flex justify-center items-center 
            w-80 h-[800px] rounded-md mt-11 
            dark:bg-blackthird bg-whitethird text-[22px] text-grayy font-bold hover:text-purple cursor-pointer'>
                + New Column
            </div>
        </div>
    )
}
