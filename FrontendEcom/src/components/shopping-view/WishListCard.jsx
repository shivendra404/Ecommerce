import { addToCart, getAddToCartCount } from '@/store/addToCartSlice';
import { addToOrder } from '@/store/orderSlice';
import { deleteWishItem } from '@/store/wishListSlice';
import axios from 'axios';
import React, { useState } from 'react';
import { FaShoppingCart, FaShoppingBag, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const WishListCard = ({ item }) => {

    const { product } = item
    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch()


    const handleAddToCart = async () => {

        try {
            dispatch(addToCart({
                productId: product._id,
                quantity: quantity,
            }))
                .then((response) => {
                    console.log("response from dispatched cart", response);
                    if (response?.payload?.success) {
                        //    from wishlist first addtocart after deleteing the wishlist item
                        handleDeleteWishList(item._id)
                        toast(response?.payload?.message, {
                            action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                            style: {
                                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                                color: '#FFFFFF'
                            },
                        });
                    } else {
                        toast("Product is not added to addtocart", {
                            action: {
                                label: "Retry",
                                onClick: () => console.log("Retry"),
                            },
                            style: {
                                backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red with transparency
                                color: '#FFFFFF'
                            },
                        });
                    }
                    dispatch(getAddToCartCount())
                })


        } catch (error) {
            console.log(error);


            toast("Product is not added to addtocart", {
                action: {
                    label: "Retry",
                    onClick: () => console.log("Retry"),
                },
                style: {
                    backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red with transparency
                    color: '#FFFFFF'
                },
            });

        }
    };

    const { isAuthenticate } = useSelector(state => state.auth)


    const handleOrder = async () => {
        if (!isAuthenticate) {
            navigate('/auth/login', {
                state: {
                    from: location.pathname, // Current page path
                    product: product._id    // Optional: Store product ID
                },
                replace: true
            });
            return;
        }

        try {

            const productPrice = product.price * quantity
            const productQuantity = quantity
            const description = product.description
            const productId = product._id
            // console.log(productPrice, productQuantity, description, productId);


            dispatch(addToOrder({
                productId: productId,
                productPrice: productPrice,
                productQuantity: productQuantity,
                description: description
            })).then((response) => {
                // console.log("response from dispatched cart", response);
                if (response?.payload?.success) {
                    toast(response?.payload?.message, {
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                        style: {
                            backgroundColor: 'rgba(76, 175, 80, 0.8)', // Light green with transparency
                            color: '#FFFFFF'
                        },
                    });
                } else {
                    toast("Order is not added to addtocart", {
                        action: {
                            label: "Retry",
                            onClick: () => console.log("Retry"),
                        },
                        style: {
                            backgroundColor: 'rgba(52, 50, 50, 0.8)', // Red with transparency
                            color: '#FFFFFF'
                        },
                    });
                }
                dispatch(getAddToCartCount())
            })
        } catch (error) {
            toast("order is not added to addtocart", {
                action: {
                    label: "Retry",
                    onClick: () => console.log("Retry"),
                },
                style: {
                    backgroundColor: 'rgba(52, 50, 50, 0.8)', // Red with transparency
                    color: '#FFFFFF'
                },
            });
        }
    }

    //dlete the wishlist item
    const handleDeleteWishList = (wishListId) => {
        dispatch(deleteWishItem({ wishListId }))
    }

    const handleUpdateQunatity = async (quantity) => {
        const res = await axios.patch(`http://localhost:9000/api/v1/wishList/updateWishListItem/${item._id}`,
            { quantity },
            { withCredentials: true })
        console.log(res);
    }


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
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center border rounded-lg">
                                <button
                                    onClick={() => {
                                        setQuantity(q => Math.max(1, q - 1))
                                        handleUpdateQunatity(quantity - 1)
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
                                        handleUpdateQunatity(quantity + 1)
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
                    <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex-1">
                        <FaShoppingCart className="text-lg" />
                        <span className="text-sm font-medium">Add to Cart</span>
                    </button>

                    <button onClick={handleOrder} className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors flex-1">
                        <FaShoppingBag className="text-lg" />
                        <span className="text-sm font-medium">Buy Now</span>
                    </button>
                    <button onClick={() => {
                        handleDeleteWishList(item._id)
                    }} className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 bg-red-500 transition-colors flex-1">
                        <FaTrash className="text-lg" />
                        <span className="text-sm font-medium">Delete</span>
                    </button>
                </div>
            </div>
        </div >
    )

}

export default WishListCard