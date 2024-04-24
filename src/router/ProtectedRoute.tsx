import { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '@/context/AuthContext';
import { AuthContextValue } from '../types/AuthContextValue';

const ProtectedRoute = ({children}: {children: ReactNode}) => {
    let { authTokens } = useContext(AuthContext) as AuthContextValue

    return !authTokens ? <Navigate to='/login'/> : children;
}

export default ProtectedRoute;