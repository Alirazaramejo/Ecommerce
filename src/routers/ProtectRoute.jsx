import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

function ProtectRoute({children}) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return children
    } else {
        return <Navigate to="/login" />;
    }
   
}

export default ProtectRoute;
