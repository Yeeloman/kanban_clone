import { create } from "zustand";

type ModalAddBoard= {
    isOpen : boolean,
    onOpen : ()=>void,
    onClose: ()=>void
}

export const useAddBoard = create<ModalAddBoard>((set)=>({
    isOpen : false,
    onOpen : ()=>{
        set({isOpen:true})
    },
    onClose : ()=>{
        set({isOpen:false})
    }
}))