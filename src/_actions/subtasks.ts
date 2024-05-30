"use server"
import { z } from "zod"
import db from "@/db/db"
import { notFound } from "next/navigation"


export async function getAllSubtasks(){
    try {
        const subs = await db.subtask.findMany() 
        if (!subs) return notFound()
        return subs
    } catch (error) {
        console.log(error) 
        return []
    }
}

export async function getSpefSubtasks(taskIds : number[]){
    try {
        const subs = await db.subtask.findMany({
            where : {
                taskId : {
                    in : taskIds
                }
            }
        })
        if (!subs.length) return []
        return subs
    } catch (error) {
        console.log(error) 
        return []
    }    
}