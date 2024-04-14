import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext';
import UsuarioContext from "@/context/UsuarioContext";

const ProtectedRoute = ({children, ...rest}) => {
    let { authTokens } = useContext(AuthContext)
    let { user } = useContext(UsuarioContext)

    return !authTokens || !user ? <Navigate to='/login'/> : children;
}

export default ProtectedRoute;