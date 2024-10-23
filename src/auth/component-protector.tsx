import {Navigate} from 'react-router-dom';
import {useAuthStore} from './auth-store';

function ProtectedRoute({children}: { children: React.ReactNode }) {
    const token = useAuthStore((state) => state.token);
    return token ? <>{children}</> : <Navigate to="/login" replace/>;
}

export default ProtectedRoute;
