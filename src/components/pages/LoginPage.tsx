import React, {useState} from 'react';
import {useAuthStore} from '../../auth/auth-store';
import api from '../../api/api';
import {useNavigate} from 'react-router-dom';

const LoginPage: React.FC = () => {
    const setToken = useAuthStore((state: { setToken: any; }) => state.setToken);
    const setUserId = useAuthStore((state: { setUserId: any; }) => state.setUserId);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const encodedCredentials = btoa(`${username}:${password}`);
            const response = await api.post('/auth/token', null, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });
            const token = response.data.token;
            const userId = response.data.userId;
            setUserId(userId);
            setToken(token);
            navigate('/profile'); // Redirect to profile page
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div>
                    <label>username:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register here</a>.
            </p>
        </div>
    );
};

export default LoginPage;
