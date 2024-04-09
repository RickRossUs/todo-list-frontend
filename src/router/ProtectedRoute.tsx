import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext';

const ProtectedRoute = ({children, ...rest}) => {
    let { authTokens, user } = useContext(AuthContext)

    return !authTokens || !user ? <Navigate to='/login'/> : children;
}

export default ProtectedRoute;