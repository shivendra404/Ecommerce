import React, { useState } from 'react';
import { FaShoppingCart, FaShoppingBag, FaTrash } from 'react-icons/fa';

const OrderCard = ({ item }) => {
    // console.log(item);
    // console.log(item.product.isProductDelivered);

    const [quantity, setQuantity] = useState(item.quantity);

    const handleAddToCart = () => {
        // console.log(`Added ${item.product.productName} to cart with quantity: ${quantity}`);
    };

    const handleOrder = () => {
        // console.log(`Ordering ${item.product.productName} with quantity: ${quantity}`);
    };

    return (
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
                            <span className="text-sm text-gray-600">Delivery Status :{item.isProductDelivered == false ? " Pending" : " Delivered"}</span>
                            <div className="flex items-center border rounded-lg">
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Section - Action Buttons */}
                <div className="flex gap-3 mt-6">
                    <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 bg-red-500 transition-colors flex-1">
                        <FaTrash className="text-lg" />
                        <span className="text-sm font-medium">Cancel Order</span>
                    </button>
                </div>
            </div>
        </div>
    )

}

export default OrderCard