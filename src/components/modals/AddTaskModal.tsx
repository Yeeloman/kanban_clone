"use client"
import React, { useState } from 'react'
import { useAddTask } from '@/hooks/useAddTask'
import IconCross from '../IconCross'
import { useCols } from '@/hooks/useCols'
import { useFormState } from 'react-dom'
import { addSimpleTask, getTasks, tryAddTask, deleteAllTasks, addATask } from '@/_actions/tasks'
import { getSpefTasks } from '@/_actions/tasks'
import { useTasks } from '@/hooks/useTasks'



export default function AddTaskModal() {
    const setTasks = useTasks((state)=>state.setTasks)
    const [error, addTask] = useFormState(addATask, {})
    const cols = useCols((state)=>state.cols)
    const [subtasks, setSubtasks] = useState<string[]>(["", ""])
    const isOpen = useAddTask((state)=>state.isOpen)
    const close = useAddTask((state)=>state.onClose)
    const fieldClassName = "mt-2 dark:bg-blackprime border border-grayy rounded-md w-full h-[40px] focus:border-purple focus:outline-none pl-4"
    const textClassName = "mt-2 dark:bg-blackprime border border-grayy rounded-md w-full h-[170px] focus:border-purple focus:outline-none pl-4"
    function handleSubChange(index:number, value:string){
        const updatedSubtasks = [...subtasks]
        updatedSubtasks[index] = value 
        setSubtasks(updatedSubtasks)
    }
    function addField(){
        setSubtasks([...subtasks, ""])
    }
    function deleteField(index:number){
        setSubtasks(subtasks.filter((_, i:number)=> i !== index))
    }
    function handleClose(){
        const helper = ["", ""]
        setSubtasks(helper)
        close()
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
    function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        addTask(formData)
        handleClose()
        getTheTasks()
    }

    return (
        <>
        {isOpen ? (
            <div onClick={handleClose} className='
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
               min-h-[700px] w-[500px] rounded-md p-10'>
                <div className='flex flex-col'>
                    <h2 className='text-[23px] font-semibold'>Add Task</h2>
                    <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
                        <div>
                            <label htmlFor="task_name" className='text-grayy dark:text-whiteprime font-semibold '>Task Name</label>
                            <input type="text" name='task_name' placeholder='e.g.Take Coffee Break' className={`${fieldClassName} pb-1`} />
                        </div>
                        <div>
                            <label htmlFor="task_desc" className='text-grayy dark:text-whiteprime font-semibold'>Description</label>
                            <textarea name="task_desc" id="" className={`${textClassName} pt-3`}></textarea> 
                        </div>
                        <div>
                            <label htmlFor="subtasks" className='text-grayy dark:text-whiteprime font-semibold'>Subtasks</label>
                            {subtasks.map((subtask:string, index : number)=>(
                                <div className='flex flex-row items-center' key={index}>
                                    <input type="text" name='subtasks' className={`${fieldClassName} mr-3`} onChange={(e)=>handleSubChange(index, e.target.value)} value={subtask} />                                    
                                    <div onClick={()=>deleteField(index)} className='pt-1'>
                                        <IconCross/>
                                    </div>
                                </div>
                            ))}
                            <AddFieldButton onClick={addField}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="status" className='text-grayy dark:text-whiteprime font-semibold'>Current Status</label>
                            <select className={fieldClassName} name="status" id="status">
                                {cols.map((col, index:number)=>(
                                    <option key={index} value={`${col.id} ${col.name}`}>{col.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <SubmitButton/>
                        </div>
                    </form>
                    {/*
                    <button onClick={getThemTasks} className='text-whiteprime text-2xl'>add task here</button>
                    */}
                </div>
               </div> 
            </div>
        ):(
            <></>
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




{/*
    async function addThemTasks(){
        try {
            const themTasks = await addSimpleTask() 
            if (themTasks){
                return themTasks
            }
        } catch (error) {
            console.log(error) 
        }
    }
    async function getThemTasks(){
        try {
           const themTasks = await getTasks() 
           if (themTasks){
                console.log(themTasks)
                return themTasks
           }
        } catch (error) {
           console.log(error) 
           return {}
        }
    }

    async function deletion(){
        try {
            const deletedTasks = await deleteAllTasks() 
            if (deletedTasks){
                return deletedTasks
            }
        } catch (error) {
            console.log(error) 
        }
    }
*/}