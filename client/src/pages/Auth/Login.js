import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../styles/AuthStyles.css'
import { useAuth } from '../../context/auth.js';

const Login = () => {
    const [email, setEmail] = useState('user1@gmail.com');
    const [password, setPassword] = useState('123456');
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
                email,
                password,
            });
            console.log(res.data);
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Register failed');
        }
    }
    return (
        <Layout title={"Login - Watch Shop"}>
            <div className='login-bg'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='title'>LOGIN FORM</h4>
                        <div className="mb-3">
                            <label htmlFor="InputEmail">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="InputEmail"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputPassword">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                controlid="InputPassword"
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <div className='mb-3'>
                            <button type="button" className="btn btn-primary" onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login