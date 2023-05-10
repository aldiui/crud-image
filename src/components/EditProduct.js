import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`https://different-teal-hippopotamus.cyclic.app/products/${id}`);
        setTitle(response.data.name);
        setFile(response.data.file);
        setPrice(response.data.price);
        setPreview(response.data.url);
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('price', price);
        try {
            await axios.patch(`https://different-teal-hippopotamus.cyclic.app/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-header">Edit Product</div>
                    <div className="card-body">
                        <form onSubmit={updateProduct}>
                            <div className="form-group mb-3">
                                <label className="form-label">Product Name</label>
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Price</label>
                                <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                            </div>
                            <div className="form-group mb-3">
                                <div class="mb-2">
                                    {preview ? (
                                        <figure>
                                            <img src={preview} width="200px" alt="Preview Image" />
                                        </figure>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <label className="form-label">Image</label>
                                <input type="file" className="form-control" onChange={loadImage} />
                            </div>
                            <div className="d-flex gap-1">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <Link to="/" className="btn btn-secondary">
                                    Kembali
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
