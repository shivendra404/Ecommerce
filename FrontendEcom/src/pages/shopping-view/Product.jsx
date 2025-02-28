
import Loader from '@/components/auth/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Product() {

    const { productItems, isLoading } = useSelector(state => state.product)

    // useEffect(() => {
    //     const fetchAllProducts = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get('http://localhost:9000/api/v1/product/getAllProduct', {
    //                 withCredentials: true
    //             });
    //             console.log(response);

    //             setProducts(response?.data?.data);



    //         } catch (error) {
    //             console.error('Error fetching brands:', error);
    //             setError('Failed to fetch brands');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAllProducts();
    // }, []);


    if (isLoading) {
        return <div>
            <Loader />
        </div>
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {
                    productItems && productItems.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
        </div>
    );

}

export default Product



const ProductCard = ({ product }) => {


    return !product ? (
        <div><Loader /></div>
    ) : (
        <Link
            to={`/product/${product._id}`}
            className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden hover:-translate-y-2"
        >
            {/* Image Container with Taller Aspect Ratio */}
            <div className="relative h-[24rem] w-full aspect-[4/5] overflow-hidden">
                <img
                    src={product?.prodImage?.url || product?.prodImage}
                    alt={product.productName}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                />
                {/* Pinterest-style Quick Save Button */}
                <button className="absolute top-2 right-2 p-3 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors duration-200">
                    <FaHeart className="w-5 h-5 text-rose-500" />
                </button>
            </div>

            {/* Product Info with Pinterest-like Typography */}
            <div className="p-4 space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug">
                    {product.productName}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gray-900">
                        ₹{product.price}
                    </p>
                </div>
            </div>
        </Link>
    );
};
