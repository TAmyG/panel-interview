import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { WildfireRoutes } from '../feature/wildfire/routes/WildFireRoutes';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<WildfireRoutes />} />
            </Routes>
        </>
    );
};
