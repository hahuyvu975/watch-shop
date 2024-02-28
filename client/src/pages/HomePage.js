import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/admin/category/get-category');
            if (data?.success) {
                setCategories(data?.categories);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in handle get all categoris");
        }
    };

    useEffect(() => {
        getAllCategories();
    },[]);

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
    };

    useEffect(() => {
        if (!checked.length || !radio.length) {
            getAllProducts();
        };
    }, [checked.length, radio.length]);

    //filter product by category
    const handleFilterProduct = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);;
        }
        setChecked(all);
    };

    //get filter product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/admin/product/product-filter', { checked, radio })
            console.log('123', data)
            if (data?.success) {
                setProducts(data?.products)
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Error in handle filter product");
        }
    }

    useEffect(() => {
        if (checked.length || radio.length) {
            filterProduct();
        }
    }, [checked, radio])

    return (
        <Layout title={"All Products - Best offers"}>
            <div className='row m-3'>
                <div className='col-md-3'>
                    <h4 className='text-center'>Filter By Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilterProduct(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className='text-center mt-4'>Filter By Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((p) => (
                            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/v1/admin/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "100%", height: "300px" }}

                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.length > 30 ?
                                        p.description.substring(0,30) + "..." : p.description}</p>
                                    <p className="card-text">$ {p.price}</p>
                                    <button className='btn btn-primary ms-1'>More details</button>
                                    <button className='btn btn-secondary ms-1'>Add to cart</button>
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