import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { WildfireRoutes } from '../features/wildfire/routes/WildFireRoutes';


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/*' element={<WildfireRoutes />} />
            </Routes>
        </>
    )
}
