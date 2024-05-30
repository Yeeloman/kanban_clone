import { create } from "zustand"

type optionBoardType = {
    isOpen : boolean;
    onChange: ()=>void;
}

export const useOptionBoard = create<optionBoardType>((set, get)=>({
    isOpen : false,
    onChange: ()=>{
        const helper = get()
        set({isOpen : !helper.isOpen})
    }
}))