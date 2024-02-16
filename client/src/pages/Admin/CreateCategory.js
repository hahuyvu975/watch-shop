import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visibale, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle create category in form
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/admin/category/create-category', { name });
            if (data?.success) {
                await getAllCategories();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in create category");
        }
    };

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/admin/category/get-category');
            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error: Show list categories")
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`/api/v1/admin/category/delete-category/${id}`)
            await getAllCategories();
            toast.success('Remove successfully');
        } catch (error) {
            toast.error("Error: Remove category")
        }
    };
    // handle update category 
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/admin/category/update-category/${selected._id}`, { name: updatedName });
            console.log(data)
            if (data?.success) {
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                await getAllCategories();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in update category");
        }
    };


    useEffect(() => {
        getAllCategories();
    }, []);



    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <CategoryForm
                                handleSubmit={handleCreateCategory}
                                value={name}
                                setValue={setName}
                            />
                        </div>
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
                                                <button
                                                    className='btn btn-primary ms-2'
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name)
                                                        setSelected(c)
                                                    }}>
                                                    Edit
                                                </button>
                                                <button
                                                    className='btn btn-danger ms-2'
                                                    onClick={() => handleDeleteCategory(c._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            open={visibale}
                        >
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdateCategory} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory