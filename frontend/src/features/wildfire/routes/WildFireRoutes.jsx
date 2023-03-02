import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../../../ui/components/Navbar';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

export const WildfireRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path='home' element={<HomePage />} />
                    <Route path='search' element={<SearchPage />} />

                    <Route path='/' element={<Navigate to="home" />} />

                </Routes>
            </div>
        </>
    )
}
