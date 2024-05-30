import { create } from "zustand";

export type Column = {
    id : number;
    name : string;
    boardId : number;
}

type Columns = {
    cols : Column[],
    setCols : (colums : Column[]) => void,
}

export const useCols = create<Columns>((set)=>({
    cols : [],
    setCols : (columns : Column[])=>{
        set({cols : columns})
    }
}))
