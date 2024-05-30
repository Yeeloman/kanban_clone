"use client"
import React from 'react'
import { useOptionBoard } from '@/hooks/useOptionBoard'
import { useDeleteBoard } from '@/hooks/useDeleteBoard'


export default function BoardOptions() {
  const isOpen = useOptionBoard((state)=>state.isOpen)
  const onChange = useOptionBoard((state)=>state.onChange)
  const onOpenDelete = useDeleteBoard((state)=>state.onOpenDelete)
  function handleOpenDelete(){
    onChange()
    onOpenDelete()
  }
  return (
    <>
        {isOpen ? (
        <div className='fixed z-10 top-[80px] right-[100px] w-[150px] h-[100px] bg-whiteprime
        shadow-lg rounded-md flex flex-col items-start pl-5 space-y-2 justify-center'>
            <p className='cursor-pointer text-grayy'>Edit Board</p>
            <p className='cursor-pointer text-red' onClick={handleOpenDelete}>Delete Board</p>
        </div>
        ) : null}
    </>
  )
}
