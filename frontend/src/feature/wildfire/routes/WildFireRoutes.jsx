import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../../../ui/components/Navbar';
import { SearchPage } from '../pages/SearchPage';

export const WildfireRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="search" element={<SearchPage />} />

                    <Route path="/" element={<Navigate to="search" />} />
                </Routes>
            </div>
        </>
    );
};
