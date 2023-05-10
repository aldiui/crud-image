import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get('https://different-teal-hippopotamus.cyclic.app/products');
        setProducts(response.data);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://different-teal-hippopotamus.cyclic.app/products/${selectedProduct.id}`);
            setProducts(products.filter((product) => product.id !== selectedProduct.id));
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    return (
        <div className="row">
            <div className="mb-3">
                <Link to="add" className="btn btn-primary">
                    Add New
                </Link>
            </div>
            {products.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={product.id}>
                    <div className="card">
                        <img src={product.url} className="card-img-top" alt="Fissure in Sandstone" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">Price : {formatPrice(product.price)}</p>
                            <div className="btn-group w-100">
                                <Link to={`edit/${product.id}`} className="btn btn-warning">
                                    Edit
                                </Link>
                                <a className="btn btn-danger" onClick={() => handleOpenModal(product)}>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Product</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this product?</p>
                                <p>{selectedProduct && selectedProduct.name}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                    Delete
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
