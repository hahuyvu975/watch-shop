import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/admin/category/get-category');
            console.log(data.categories[0]);
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            toast.error("Error: Show list categories")
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleCategoryForm = () => {
        navigate('/api/v1/admin/update-category');
    }

    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                            <tr key={c._id}>
                                                <td>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={handleCategoryForm}>Edit</button>
                                                </td>
                                            </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory