import { create } from 'zustand'


type ModalAddTask = {
   isOpen : boolean;
   onOpen : ()=>void;
   onClose: ()=>void;
}

export const useAddTask = create<ModalAddTask>((set) => ({
  isOpen: false,
  onOpen:()=>{
    set({isOpen : true})
  },
  onClose:()=>{
    set({isOpen : false })
  }
}))