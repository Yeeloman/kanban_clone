"use server"
import { z } from "zod"
import db from "@/db/db"
import { notFound } from "next/navigation"


export async function getTheCols(boardId : number){
    try {
        const cols = await db.column.findMany({
            where : {
                boardId : boardId
            }
        })
        if (!cols){
            return notFound()
        }
        return cols
    } catch (error) {
        console.log(error)
        return []
    }
}