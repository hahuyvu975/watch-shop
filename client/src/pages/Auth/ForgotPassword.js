import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../../styles/AuthStyles.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, {
                email,
                answer,
                newPassword
            });
            console.log(res.data);
            if (res && res.data.success) {
                toast.success(res.data.message);
               
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
        <Layout title={"Forgot Password - Watch Shop"}>
            <div className='form-container'>
                    <form onSubmit={handleChange} >
                        <h4 className='title'>CHANGE PASSWORD FORM</h4>
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
                            <label htmlFor="InputAnswer">What is your favorite sports?</label>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                controlid="InputAnswer"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputNewPassword">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                controlid="InputNewPassword"
                                required
                            />
                        </div>
                            <button type="submit" className="btn btn-primary">Change Password</button>
                    </form>
                </div>
        </Layout>
    )
}

export default ForgotPassword