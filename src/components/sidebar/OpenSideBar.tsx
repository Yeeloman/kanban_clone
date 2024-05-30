"use client"
import React, { useEffect, useState } from 'react'
import Switch from './Switch'
import ControlSidebar from './ControlSidebar'
import AddBoard from './AddBoard'
import { getBoards } from '@/_actions/boards'
import { Board } from '@prisma/client'
import BoardTemplate from './BoardTemplate'
import { useBoards } from '@/hooks/useBoards'
import { createBoard } from '@/_actions/boards'




export default function OpenSideBar() {
  const boards = useBoards((state)=>state.boards)
  const onActive = useBoards((state)=>state.onActive)
  {/*
  const createLeBoard = async()=>{
    await createBoard()
    getTheBoards()
  }
  const [boards, setBoards] = useState<any>(null)
  const getTheBoards = async()=>{
    try{
      const res = await getBoards()
      if (res) setBoards(res)

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getTheBoards()
  }, [])
*/}
  return (
    <>
        <div className='h-full w-[270px]'></div>
        <div className='bg-whiteprime dark:bg-blackprime fixed bottom-0
        left-0 top-[85px] w-[270px] flex flex-col justify-between'>
            <div className='w-[270px] h-[100px] mt-7'>
              <div className='ml-3 text-grayy mb-6'>
                ALL BOARDS &#40; {boards ? boards?.length : 0 } &#41; 
              </div>
              {boards !== null ? (boards.map((board : Board) => (
                <div key={board.id} onClick={()=>onActive(board.id)}>
                  <BoardTemplate name={board.name} isActive={board.isActive} />
                </div>
              ))) : (
                <div></div>
              )}
              <AddBoard/>
            </div>



            <div className='w-[270px] space-y-4 h-[100px] mb-10 '>
                <Switch/>
                <ControlSidebar/>
            </div>
        </div>
    </>
  )
}
