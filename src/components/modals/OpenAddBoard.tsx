import React from 'react'
import { useState } from 'react'
import { useAddBoard } from '@/hooks/useAddBoard'
import { showFormData } from '@/_actions/boards'
import { useFormState } from 'react-dom'
import { createBoard } from '@/_actions/boards'
import { getBoards } from '@/_actions/boards'
import { useBoards } from '@/hooks/useBoards'
import { notFound } from 'next/navigation'

const wtvr = {}


export default function OpenAddBoard() {
    const setBoards = useBoards((state)=>state.setBoards)
    const setActiveBoard = useBoards((state)=>state.setFirstActive)
    const [error, another] = useFormState(createBoard, wtvr)
    const close = useAddBoard((state)=>state.onClose)
    const [fields, setFields] = useState<string[]>(["Todo", "Doing"])
    const [name, setName] = useState<string>('')


    const getBoardsAfterSub = async()=>{
        try {
            const res = await getBoards()
            if(res){
                setBoards(res)
                setActiveBoard()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const actionShow = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        showFormData(name, fields);
     };
    const fieldClassName = "mt-2 dark:bg-blackprime border border-grayy rounded-md w-full h-[40px] focus:border-purple focus:outline-none pl-4"
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        another(formData); // Call the function with FormData
        getBoardsAfterSub();
        close();
    };
    const handleChangeField = (index:number, value:string)=>{
        const updatedFields = [...fields]
        updatedFields[index] = value
        setFields(updatedFields)
    }

    const handleRemoveField = (index:number)=>{
        const updatedFields = fields.filter((_,i)=>i!==index);
        setFields(updatedFields) 
    }
    const addField = ()=>{
        const updatedFields = [...fields, ""]
        setFields(updatedFields)
    }
    
    return (
        <div onClick={close} className='
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
            <div onClick={(e)=>e.stopPropagation()} className='bg-whiteprime 
            dark:bg-blackprime min-h-[450px] w-[480px] rounded-md'>
            <div className='p-10 flex flex-col'>
                <h2 className='font-semibold w-full text-[20px]'>Add new board</h2>
                <div className='mt-5 w-full flex justify-start'>
                    <form onSubmit={handleSubmit} className='w-full' >
                        <div className='flex flex-col w-full'>
                            <label htmlFor="name">Board Name</label>
                            <input type="text" value={name} required onChange={(e)=>setName(e.target.value)} name='name' placeholder='e.g : Web Design'  id='name' 
                            className={`${fieldClassName}`}/>
                            <label htmlFor="columns" className='mt-3'>Board Columns</label>
                            {fields.map((field:string, index:number)=>(
                                <div  className='flex flex-row items-center' key={`col_${index}`}>
                                    <input 
                                        type="text" 
                                        id={`${index}_col`}
                                        value={field}
                                        className={`${fieldClassName}`}
                                        onChange={(e)=>handleChangeField(index, e.target.value)}
                                        required
                                        name='cols'
                                    />
                                    <div onClick={()=>handleRemoveField(index)} className='ml-1 cursor-pointer pt-1'>
                                        <Cross/>
                                    </div>
                                </div>
                            ))}
                            <AddFieldButton onClick={addField}/>
                            <SubmitButton />
                        </div>
                    </form>
                </div>
            </div>
            </div> 
        </div> 
  )
}

function Cross(){
    return(
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
    )
}

function SubmitButton(){
    return(
        <button type='submit' className='w-full h-[40px] mt-5 rounded-full bg-purple 
        text-whiteprime font-semibold'>Create New Board</button>
    )
}
function AddFieldButton({onClick}:{onClick:React.MouseEventHandler<HTMLButtonElement>}){
    return(
        <button onClick={onClick} type = "button" className='w-full h-[40px] mt-[50px] rounded-full dark:bg-whiteprime
        dark:text-purple bg-purple text-whiteprime font-semibold'>+Add New Column</button>
    )
}