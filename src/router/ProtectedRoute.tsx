import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext';

const ProtectedRoute = ({children, ...rest}) => {
    let { authTokens } = useContext(AuthContext)

    return !authTokens ? <Navigate to='/login'/> : children;
}

export default ProtectedRoute;