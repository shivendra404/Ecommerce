import { deleteCartItem } from '@/store/addToCartSlice';
import axios from 'axios';
import React, { useState } from 'react';
import { FaTrash, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
const AddToCartCard = ({ item }) => {
    // console.log(item);

    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch()

    
    const handleDeleteAddToCart = (id) => {
        dispatch(deleteCartItem({ id }))
    }

    const handleUpdateQunatity = async (quantity, id) => {
        const res = await axios.patch(`http://localhost:9000/api/v1/addToCart/${id}`,
            { quantity },
            { withCredentials: true })
        console.log(res);
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex">
                {/* Image Section - Left Side */}
                <div className="w-1/3 flex-shrink-0">
                    <img
                        src={item.product.prodImage.url}
                        alt={item.product.productName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section - Right Side */}
                <div className="flex-1 flex flex-col p-6">
                    {/* Upper Section - Product Details */}
                    <div className="flex-grow">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 mt-1">
                                {item.product.productName}
                            </h2>
                        </div>

                        <p className="text-gray-600 text-base mb-4 line-clamp-4 leading-relaxed">
                            {item.product.description}
                        </p>

                        <div className="mt-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-gray-800">
                                    ₹{item.product.price.toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500">INR</span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="mt-4 flex items-center gap-3">
                                <span className="text-sm text-gray-600">Quantity:</span>
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        onClick={() => {
                                            setQuantity(q => Math.max(1, q - 1))
                                            handleUpdateQunatity(quantity - 1, item._id)
                                        }
                                        }
                                        className="px-3 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 border-x">{quantity}</span>
                                    <button
                                        onClick={() => {
                                            setQuantity(q => Math.min(item.product.stock, q + 1))
                                            handleUpdateQunatity(quantity + 1, item._id)
                                        }
                                        }
                                        className="px-3 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={quantity === 5}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lower Section - Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => {
                            handleDeleteAddToCart(item._id)
                        }} className="active:bg-red-500 hover:bg-red-700 bg-red-600 flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg   transition-colors flex-1">
                            <FaTrash className="text-lg" />
                            <span className="text-sm font-medium">Delete</span>
                        </button>

                        <button className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 active:bg-gray-700 transition-colors flex-1">
                            <FaShoppingBag className="text-lg" />
                            <span className="text-sm font-medium">Buy Now</span>
                        </button>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )

}

export default AddToCartCard