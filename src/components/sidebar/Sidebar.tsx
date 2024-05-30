"use client"
import React from 'react'
import { useSideBar } from '@/hooks/useSideBar'
import OpenSideBar from './OpenSideBar'
import ClosedSidebar from './ClosedSidebar'

export default function Sidebar() {
    const isOpen = useSideBar((state)=>state.isOpen)        
    return (
        <>
            {isOpen ? (
                <>
                    <OpenSideBar/>
                </>
            ) : (
                <>
                    <ClosedSidebar/>
                </>
            )}

        </>
    )
}
