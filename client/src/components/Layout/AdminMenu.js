import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4>Admin DashBoard</h4>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item">
                        Category
                    </NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item">
                        Product
                    </NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item">
                        Users
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu