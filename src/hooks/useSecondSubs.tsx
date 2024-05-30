import { create } from "zustand";

export type SsubTask = {
    id : number;
    title : string;
    isCompleted: boolean;
    taskId: number;
}

type Ssubtasks= {
    ssubtasks: SsubTask[];
    setSsubtasks: (ssubtasks: SsubTask[])=>void;
}

export const useSecondSubs= create<Ssubtasks>((set, get)=>({
    ssubtasks: [],
    setSsubtasks: (ssubtasks: SsubTask[])=>{
        set({ssubtasks: ssubtasks})
    }
}))