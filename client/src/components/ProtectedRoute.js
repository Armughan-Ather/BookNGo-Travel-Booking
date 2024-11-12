import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Assuming you have this context for authentication

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Assuming you have an auth hook

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        navigate("/login", { replace: true });
        return null; // Prevent rendering of the child component
    }

    // If authenticated, render the child components
    return <>{children}</>;
};

export default ProtectedRoute;
