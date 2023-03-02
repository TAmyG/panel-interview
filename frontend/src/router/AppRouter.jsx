import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { UserRoutes } from '../features/user/routes/UserRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path='/*' element={<PrivateRoute><UserRoutes /></PrivateRoute>} />
            </Routes>
        </>
    )
}
