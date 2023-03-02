import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


export const PrivateRoute = ({ children }) => {

    const logged = true;
    //const { pathname, search } = useLocation(); // implement last page visited

    return (logged) ? children : <Navigate to="/login" />
}
