import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "sonner";
import { addWishlist, getWishListCount } from '@/store/wishListSlice';
import { addToCart, getAddToCartCount } from '@/store/addToCartSlice';
import { addToOrder } from '@/store/orderSlice/index.js';
import Loader from '../auth/Loader';

function ProductDescCard() {
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log(id);
    const { isAuthenticate } = useSelector(state => state.auth)

    useEffect(() => {
        setLoading(true)
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/product/getProduct/${id}`, {
                    withCredentials: true
                });
                // console.log(response);

                // console.log("response", response?.data?.data);
                setProduct(response?.data?.data);

            } catch (error) {
                console.error('Error fetching product:', error);
                // setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [])



    const handleWishList = async () => {

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

            console.log("hii1");

            dispatch(addWishlist({ product: product._id, quantity }))
                .then((response) => {
                    console.log(response);
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

                        dispatch(getWishListCount())
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



                })


        } catch (error) {
            console.log(error);

            toast("Product is not added to wishlist", {
                action: {
                    label: "Retry",
                    onClick: () => console.log("Retry"),
                },
                style: {
                    backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red with transparency
                    color: '#FFFFFF'
                },
            });
        } finally {
            // setIsAddingToCart(false);
            setQuantity(1)
        }
    };

    const handleAddToCart = async () => {

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
            console.log("hii");

            dispatch(addToCart({
                productId: product._id,
                quantity: quantity,
            }))
                .then((response) => {
                    console.log("response from dispatched cart", response);
                    if (response?.payload?.success) {
                        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                        // 
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

        } finally {
            // setIsAddingToCart(false);
            setQuantity(1)
        }
    };


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


            dispatch(addToOrder({
                productId: productId,
                productPrice: productPrice,
                productQuantity: productQuantity,
                description: description
            })).then((response) => {
                console.log("response from dispatched cart", response);
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
                            backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red with transparency
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
                    backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red with transparency
                    color: '#FFFFFF'
                },
            });
        } finally {
            // setIsAddingToCart(false);
            setQuantity(1)
        }
    }


    useEffect(() => {
        if (isAuthenticate) {
            dispatch(getWishListCount())
            dispatch(getAddToCartCount())
        }
    }, [dispatch, isAuthenticate])

    if (loading) {
        return (<div><Loader /></div>)
    }

    if (error) {
        return (<div>{error}</div>)
    }



    return (
        <div className="max-w-4xl  mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex">
            {/* Image Section - Left Side */}
            <div className="w-1/3 flex-shrink-0">
                <img
                    src={product.prodImage.url}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section - Right Side */}
            <div className="flex-1 flex flex-col p-6">
                {/* Upper Section - Product Details */}
                <div className="flex-grow">
                    <div className="mb-4">
                        <span className="text-sm text-emerald-600 font-medium">
                            {product.brandId.brandName} • {product.categoryId.name}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800 mt-1">
                            {product.productName}
                        </h2>
                    </div>

                    <p className="text-gray-600 text-base mb-4 line-clamp-4 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-6">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-gray-800">
                                ₹{product.price.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500">INR</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center border rounded-lg">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-3 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={quantity === 1}
                                >
                                    -
                                </button>
                                <span className="px-3 py-1 border-x">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
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

                    <button onClick={handleWishList} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex-1">
                        <FaHeart className="text-lg" />
                        <span className="text-sm font-medium">Wishlist</span>
                    </button>

                    <button onClick={handleOrder} className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors flex-1">
                        <FaShoppingBag className="text-lg" />
                        <span className="text-sm font-medium">Buy Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDescCard
