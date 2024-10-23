import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthStore} from '../../auth/auth-store';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const token = useAuthStore((state) => state.token);
    const clearToken = useAuthStore((state) => state.clearToken);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken();
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-blue-600 text-white">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-lg font-semibold">
                        <Link to="/">My TODO App</Link>
                    </div>
                    <div className="space-x-4">
                        {token ? (
                            <>
                                <Link to="/profile" className="hover:underline">
                                    Profile
                                </Link>
                                <Link to="/lists" className="hover:underline">
                                    My Lists
                                </Link>
                                <button onClick={handleLogout} className="hover:underline">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:underline">
                                    Login
                                </Link>
                                <Link to="/register" className="hover:underline">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto px-4 py-4 text-center">
                    © {new Date().getFullYear()} My TODO App
                </div>
            </footer>
        </div>
    );
};

export default Layout;
