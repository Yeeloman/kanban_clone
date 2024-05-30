import { create } from "zustand";

export type Task = {
    id : number;
    title : string;
    description : string;
    status : string;
    columnId : number
}

type Tasks = {
    tasks : Task[];
    setTasks : (tasks : Task[])=>void;
}

export const useTasks = create<Tasks>((set, get)=>({
    tasks : [],
    setTasks : (tasks : Task[])=>{
        set({tasks : tasks})
    }
}))