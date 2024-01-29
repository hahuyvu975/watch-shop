import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, phone, address);
        toast.success('Register successfully')
    }
    return (
        <Layout title={"Register - Watch Shop"}>
            <div className='register'>
                <h1>Register Form</h1>
                <form onSubmit={handleSubmit}>
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
                            id="InputPhone" />
                        required
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
                    <></>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register