import { create } from "zustand"

type deleteBoard = {
    isOpenDelete : boolean,
    onOpenDelete : ()=>void,
    onCloseDelete : ()=>void 
}

export const useDeleteBoard = create<deleteBoard> ((set, get)=>({
    isOpenDelete : false, 
    onOpenDelete : ()=>{
        set({isOpenDelete : true})
    },
    onCloseDelete : ()=>{
        set({isOpenDelete : false})
    }
}))