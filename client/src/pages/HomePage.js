import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth.js';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/admin/product/get-product');
            if (data?.success) {
                toast.success(data?.message);
                setProducts(data?.products);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in get all products')
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout title={"All Products - Best offers"}>
            <div className='row mt-3'>
                <div className='col-md-3'>
                    <h4 className='text-center'>Filter By Category</h4>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((p) => (           
                                <div key={p._id}  className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`/api/v1/admin/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ width: "100%", height: "300px" }}

                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage