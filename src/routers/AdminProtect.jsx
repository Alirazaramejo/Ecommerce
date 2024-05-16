import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

function AdminProtect() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.user.email === "alirazakhan2540@gmail.com") {
        return <Outlet />;
    } else {
        return <Navigate to="/checkout" />;
    }
   
}

export default AdminProtect;
