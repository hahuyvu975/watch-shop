import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PiWatchFill } from 'react-icons/pi';
import { useAuth } from '../../context/auth';

const Header = () => {
    const [auth, setAuth] = useAuth();
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link to="/" className="navbar-brand"><PiWatchFill style={{}} /> Watch Shop</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link"  >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link" >Category</NavLink>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link"  >Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" >Register</NavLink>
                                    </li>
                                </>) : (<>
                                    <NavLink to="/login" className="nav-link">
                                        LogOut
                                    </NavLink>
                                </>)
                            }
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link" >Cart (0)</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header