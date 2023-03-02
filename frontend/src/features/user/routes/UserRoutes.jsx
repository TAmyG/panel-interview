import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../../../ui/components/Navbar';
import { P1 } from '../pages/P1';
import { P2 } from '../pages/P2';

export const UserRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path='p1' element={<P1 />} />
                    <Route path='p2' element={<P2 />} />

                    <Route path='/' element={<Navigate to="p1" />} />

                </Routes>
            </div>
        </>
    )
}
