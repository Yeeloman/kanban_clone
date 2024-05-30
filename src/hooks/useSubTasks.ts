import { create } from "zustand";

export type Subtask = {
    id : number;
    title : string;
    isCompleted : boolean;
    taskId : number
}

type Subtasks = {
    subtasks : Subtask[];
    setSubTasks : (subs : Subtask[])=>void;
    setSubTaskDone : (isComp : boolean, subId : number)=>void;
}

export const useSubTasks = create<Subtasks>((set, get)=>({
    subtasks : [],
    setSubTasks : (subtasks : Subtask[])=>{
        set({subtasks : subtasks})
    },
    setSubTaskDone : (isComp: boolean, subId:number)=>{
        const currSubs = get()
        const updatedSubs = currSubs.subtasks.map((subtask : Subtask)=>{
            if (subtask.id == subId){
                if (isComp === true){
                    return {...subtask, isCompleted : false}
                } else {
                    return {...subtask, isCompleted : true}
                }
            }
            return subtask
        })
        if(updatedSubs){
            set({subtasks : updatedSubs})
        }
    }
}))