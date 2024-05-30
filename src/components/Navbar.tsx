"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Button from './Button'
import Logo from './Logo'
import { deleteAll } from '@/_actions/boards'
import { useRouter } from 'next/navigation'
import { getCols } from '@/_actions/boards'
import { getBoards } from '@/_actions/boards'
import { getTheCols } from '@/_actions/cols'
import { useBoards } from '@/hooks/useBoards'
import { getAllSubtasks } from '@/_actions/subtasks'
import { useOptionBoard } from '@/hooks/useOptionBoard'


export default function Navbar() {
  const onChange = useOptionBoard((state)=>state.onChange)
  const theBoards = useBoards((state)=>state.boards)
  const [boardId, setBoardId] = useState<number>(0)
  useEffect(()=>{
    setBoardId(theBoards[0]?.id)
  },[theBoards])
  const router = useRouter()
  const getAllBoards = async()=>{
    try {
      const res = await getBoards() 
      if(res){
        console.log(res)
        return res
      }
    } catch (error) {
      console.log(error) 
    }
  }
  const getAllSubs = async()=>{
    try {
      const res = await getAllSubtasks()
      if (res){
        console.log(res)
        return res
      }
    } catch (error) {
      console.log(error) 
    }
  }
  const getAllCols= async()=>{
    try {
      const res = await getCols()  
      if (res) {
        console.log(res)
        return res
      } 
    } catch (error) {
      console.log(error) 
    }
  }
  const getSpefCols= async()=>{
    try {
      const res = await getTheCols(boardId)  
      if (res) {
        console.log(res)
        return res
      } 
    } catch (error) {
      console.log(error) 
    }
  }
  return (
    <div className='
    w-full 
    bg-whiteprime
    dark:bg-blackprime
    h-[90px]
    flex justify-between
    items-center 
    '>
        <div className='flex'>
          <div className='ml-8'>
            <Logo/>
          </div>
          <h1 className='text-[20px] font-semibold'>
            Platform Launch
          </h1> 
        </div>



        <div className='flex space-x-2 md:space-x-5 lg:space-x-5 items-center mr-2 lg:mr-5 md:mr-5'>
          <Button/>
          <div onClick={onChange}>
            <VerticalEllipsis/>
          </div>
          <UserButton/>
        </div>
    </div>
  )
}


function VerticalEllipsis(){
  return(
    <div className='cursor-pointer'>
      <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
    </div>
  )
}