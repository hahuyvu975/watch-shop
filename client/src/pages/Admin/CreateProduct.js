import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("rolex new v1");
    const [description, setDescription] = useState("luxury, class S");
    const [price, setPrice] = useState("1520");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate();

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

    // handle create product
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.post('/api/v1/admin/product/create-product',
                productData
            );

            console.log(data)
            if (data?.success) {
                toast.success(data?.message);
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in create product")
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])
    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Create Product</h1>
                        <div className='m-1 w-75'>
                            <Select
                                variant={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => {
                                    setCategory(value)
                                }}
                            >
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type='file'
                                        name='photo'
                                        accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt='product_photo'
                                            height={"200px"}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    value={name}
                                    placeholder='write a name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    type='text'
                                    value={description}
                                    placeholder='write a description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='number'
                                    value={price}
                                    placeholder='write a price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type='number'
                                    value={quantity}
                                    placeholder='write a quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <Select
                                    variant={false}
                                    placeholder='Select Shipping'
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(e) => {
                                        setShipping(e)
                                    }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleCreateProduct}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct