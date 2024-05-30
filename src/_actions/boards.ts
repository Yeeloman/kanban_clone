"use server"
import { z } from "zod"
import db from "@/db/db"
import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"


const addBoard = z.object({
  name : z.string().min(1),
  cols : z.array(z.string().min(1))
})

export async function createBoard(prevState:any, formData:FormData){
    const { userId } = auth()
    const rawFormData = {
      name : formData.get('name'),
      cols : formData.getAll('cols'),
    }
    const result = addBoard.safeParse(rawFormData)
    const data = result.data
    if (data && userId){
      const name = data?.name
      const cols = data?.cols.map((col:string)=>{
        const obj = {
          name : col
        }
        return obj
      })
      try {
      const boards = await db.board.create({
        data : {
          userId : userId,
          name: name,
          isActive : false,
          columns: {
            create : cols 
          } 
      }})
      if (!boards) {
        return notFound();
      }
      return boards;
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while getting the board." };
    }
    }
}

export async function getCols(){
  try {
    const cols = await db.column.findMany() 
    if (!cols){
      return notFound()
    }
    return cols
  } catch (error) {
    console.log(error) 
    return []
  }
}

export async function getActiveBoard(){
  try {
    const res = await db.board.findFirst({
      where: {
        isActive : true
      }
    }) 
    if(!res) return notFound()
    return res
  } catch (error) {
    console.log(error) 
    return []
  }
}

export async function getBoards() {
    try {
    const boards = await db.board.findMany()
    if (!boards) {
      return notFound();
    }
    return boards;
  } catch (error) {
    console.error(error);
    return []
  }
}


export async function showFormData(name : string, cols : string[] ) {
  console.log(name)
  console.log(cols)
}


export async function createBord(formData : FormData) {
    const result = addBoard.safeParse(Object.fromEntries(formData.entries()))
    if(result.success === false){
      return result.error.formErrors.fieldErrors
    }
    const data = result.data
    const { userId } = auth()
    
    if (userId){
        try {
        const boards = await db.board.create({
          data : {
            userId : userId,
            name: data.name,
            isActive : false,
            columns: {
              create : [{name:""}]
            } 
        }})
        if (!boards) {
          return notFound();
        }
        return boards;
      } catch (error) {
        console.error(error);
        return { error: "An error occurred while getting the board." };
      }
    }

}


export async function deleteAll() {
  try{
    const deleteAllBoards = await prisma?.board.deleteMany({})
    if (!deleteAllBoards)
    return deleteAllBoards
  }catch(error){
    console.log(error)
  }
}

export async function deleteSpefBoard(boardId : number){
  try {
    const deleteBoard = await db.board.delete({
      where : {
        id : boardId
      }
    }) 
    if (!deleteBoard) return notFound()
    return deleteBoard
  } catch (error) {
    console.log(error) 
  }
}