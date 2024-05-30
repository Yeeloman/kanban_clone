import { create } from "zustand";

type SideBar = {
    isOpen : boolean,
    onUse : ()=>void,
}

export const useSideBar = create<SideBar>((set)=>({
    isOpen:true,
    onUse : ()=>{
        set((state)=>({isOpen: !state.isOpen}))
    }
}))