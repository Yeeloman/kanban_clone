"use client"
import React, { useEffect, useState } from 'react'
import { useDeleteBoard } from '@/hooks/useDeleteBoard'
import { deleteSpefBoard, getBoards } from '@/_actions/boards'
import { useBoards } from '@/hooks/useBoards'

export default function DeleteBoard() {
    const setBoards = useBoards((state)=>state.setBoards)
    const setActiveBoard = useBoards((state)=>state.setFirstActive)
    const getCurrentBoard = useBoards((state)=>state.getActive)
    const isOpenDelete = useDeleteBoard((state)=>state.isOpenDelete)
    const onCloseDelete = useDeleteBoard((state)=>state.onCloseDelete)
    const getBoardsAfterDel = async()=>{
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
    async function deleteTheBoard(){
        try {
            const activeBoardId = getCurrentBoard()
            const deletedBoard = await deleteSpefBoard(activeBoardId) 
            if(deletedBoard){
                getBoardsAfterDel()
                onCloseDelete()
            }
        } catch (error) {
            console.log(error) 
        }
    }

    return (
        <>
        {isOpenDelete? (
            <div className='
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
               min-h-[200px] w-[500px] rounded-md p-6'>
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-semibold text-red'>Delete this Board ?</h1> 
                        <p className='text-sm text-grayy mt-7'>Are you sure you want to delete this board? This action will remove all columns and tasks and cannot be reversed.</p>
                        <div className='flex flex-row items-center justify-between'>
                            <button onClick={deleteTheBoard} className='w-[48%] h-[40px] mt-8 bg-red rounded-full flex justify-center items-center text-whiteprime font-bold'>Delete</button>
                            <button onClick={onCloseDelete} className='w-[48%] h-[40px] mt-8 bg-lightpurple rounded-full flex justify-center items-center text-purple font-bold'>Cancel</button>
                        </div>
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

