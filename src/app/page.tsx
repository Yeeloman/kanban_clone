"use client"
import Navbar from "@/components/Navbar";
import AddTaskModal from "@/components/modals/AddTaskModal";
import AddBoardModal from "@/components/modals/AddBoardModal";
import Sidebar from "@/components/sidebar/Sidebar";
import ColTemp from "@/components/columns/ColTemp";
import { getBoards } from "@/_actions/boards";
import { useEffect } from "react";
import { useBoards } from "@/hooks/useBoards";
import { useCols } from "@/hooks/useCols";
import TaskModal from "@/components/modals/TaskModal";
import BoardOptions from "@/components/options/BoardOptions";
import DeleteBoard from "@/components/options/DeleteBoard";

export default function Home() {
  const cols = useCols((state)=>state.cols)
  const setBoards = useBoards((state)=>state.setBoards)
  const setActiveBoard = useBoards((state)=>state.setFirstActive)
  const getTheBoards = async()=>{
    try {
      const themBoards = await getBoards() 
      if (themBoards) {
        setBoards(themBoards) 
        setActiveBoard()
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getTheBoards()
  },[])
  return (
    <main className="bg-whitesecond dark:bg-blacksecond min-h-full w-full">
      <DeleteBoard/>
      <BoardOptions/>
      <TaskModal/>
      <AddBoardModal/>
      <AddTaskModal/>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar/>
        <div className="p-10 min-h-[800px] max-w-full">
          <ColTemp/>
        </div>
      </div>
    </main>
  );
}
