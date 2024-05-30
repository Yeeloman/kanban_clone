import { create } from "zustand";
import { Subtask } from "@prisma/client";

type Data = {
    taskId : number;
    isOpen : boolean;
    title : string;
    description : string;
    subtasks : Subtask[];
    status : string
}

type ModalTask = {
    data : Data;
    onOpen : (taskId : number, title : string, description:string, subtasks:Subtask[],status:string)=>void;
    onClose : ()=>void;
}

export const useTaskModal = create<ModalTask>((set, get)=>({
    data : {
        taskId : 0,
        isOpen : false,
        title : '',
        description : '',
        subtasks : [],
        status : ''
    },
    onOpen : (taskId : number, title : string, description:string, subtasks:Subtask[],status:string) =>{
        set((state)=>({
            data : {
                ...state.data,
                taskId : taskId,
                isOpen : true,
                title : title,
                description : description,
                subtasks : subtasks,
                status : status
            }
        }))
    },
    onClose : ()=>{
        set((state)=>({
            data : {
                ...state.data,
                isOpen : false
            }
        }))
    }
}))