import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-hot-toast';
import '../../styles/AuthStyles.css'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer
            })
            if (res && res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => navigate('/login'), 2000 )
                ;
            } else {
                toast.error(res.data.message);
                console.log('false')
            }
        } catch (error) {
            console.log(error);
            toast.error('Register failed');
        }
    }
    return (
        <Layout title={"Register - Watch Shop"}>
            <div className='register-bg'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='title'>REGISTER FORM</h4>
                        <div className="mb-3">
                            <label htmlFor="InputName">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="InputName"
                                required
                            />
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="InputPhone">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                id="InputPhone"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputAddress">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="InputAddress"
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
                                id="InputAnswer"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register