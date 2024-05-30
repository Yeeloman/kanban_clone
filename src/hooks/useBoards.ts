import { create } from 'zustand';

export type Board = {
    id : number,
    isActive: boolean,
    name: string,
    userId : string
}

type Boards = {
    boards: Board[],
    onActive: (theId: number) => void,
    setBoards : (boards : Board[]) => void,
    setFirstActive : ()=>void,
    getActive : ()=>number
}

export const useBoards = create<Boards>((set, get) => ({
    boards: [],
    onActive: (activeId: number) => {
        set((state) => ({
            boards: state.boards.map((board) => ({
                ...board,
                isActive: board.id === activeId 
            }))
        }));
    },
    setBoards : (boards : Board[]) =>{
        set({boards : boards})
    },
    setFirstActive : ()=>{
        set((state)=>({boards : state.boards.map((board:Board, index:number)=>({
                ...board,
                isActive : index === 0
        }))
    }))
    },
    getActive : ()=>{
        const {boards} = get()
        const activeBoard = boards.find((board:Board)=>board.isActive === true) 
        if (!activeBoard) return 0 
       return activeBoard.id
    }
    
}));
