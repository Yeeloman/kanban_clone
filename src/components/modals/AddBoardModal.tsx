"use client"
import React from 'react'
import OpenAddBoard from './OpenAddBoard'
import { useAddBoard } from '@/hooks/useAddBoard'

export default function AddBoardModal() {
    const  isOpen  = useAddBoard((state)=>state.isOpen)
    return (
        <>
            {isOpen ? (
                <OpenAddBoard/>
            ) : (
                <div></div>
            )} 
        </>
    )
}