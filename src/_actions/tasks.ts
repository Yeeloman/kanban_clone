"use server"

import { z } from "zod"
import db from "@/db/db"
import { notFound } from "next/navigation"


const addTask = z.object({
    title : z.string().min(1),
    description : z.string().min(1),
    status : z.string().min(1),
    subtasks : z.array(z.string().min(1)),

})

export async function addATask(prevState:any, formData:FormData){
    const rawFormData = {
        title : formData.get('task_name'),
        description : formData.get('task_desc'),
        subtasks: formData.getAll('subtasks'),
        status : formData.get('status'),
    }
    const result = addTask.safeParse(rawFormData)
    const data = result.data
    if (data){
        const subs = data?.subtasks.map((subtask)=>{
            return {
                title : subtask,
                isCompleted : false
            }
        })
        const helper = data?.status.split(' ')
        const colId = helper ? Number(helper[0]) : 0
        const status = helper ? helper[1] : ""
        const title = data.title
        const description = data.description
        try {
            const tasks = await db.task.create({
                data : {
                    title : title,
                    description : description,
                    status : status,
                    columnId : colId,
                    subtasks : {
                        create : subs
                    }
                }
            }) 
            if (!tasks){
                return notFound();
            }
            return tasks
        } catch (error) {
            console.log(error) 
            return {} 
        }

    }
    return {}
}

export async function tryAddTask(prevState : any, formData: FormData){
    const data = formData
    console.log(data)
    return {}
}

export async function addSimpleTask(){
    try {
        const tasks = await db.task.create({
            data : {
                title : "secondtask",
                description : "second task description",
                status : "done",
                subtasks : {},
                columnId : 499
            }
        })
        if (!tasks) return notFound()
        return tasks;
    } catch (error) {
        console.log(error)
        return {}
    }
}

export async function getTasks(){
    try {
        const tasks = await db.task.findMany()
        if (!tasks) return notFound()

        return tasks
    } catch (error) {
        console.log(error)
        return {}
    }
}

export async function getSpefTasks(colIds : number[]){
    try {
        const tasks = await db.task.findMany({
            where:{
                columnId : {
                    in : colIds
                }
            }
        }) 
        if (!tasks.length) return []
        return tasks;
    } catch (error) {
        console.log(error)  
        return []
    }
}

export async function deleteAllTasks(){
    try {
        const deletedTasks = await db.task.deleteMany() 
        if (deletedTasks) return deletedTasks
    } catch (error) {
        console.log(error)  
    }
}