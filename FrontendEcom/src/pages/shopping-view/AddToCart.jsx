
import React, { useEffect, useState } from 'react';
import AddToCartCard from '../../components/shopping-view/AddToCartCard'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';
import Loader from '@/components/auth/Loader';

function AddToCart() {


    const { isLoading, addToCart } = useSelector(state => state.addToCart)
    const [totalAmount, setTotalAmount] = useState(0)
    const [subItems, setSubItems] = useState(0)
    console.log(addToCart);




    // console.log(addToCart);
    useEffect(() => {
        console.log(addToCart);

        if (addToCart) {

            // Calculate values directly without inner functions
            // const totalAmount = addToCart.reduce(
            //     (total, item) => total + item.quantity * item.product.price,
            //     0
            // );
            // const subItems = addToCart.reduce(
            //     (subTotal, item) => subTotal + item.quantity,
            //     0
            // );

            setSubItems(subItems);
            setTotalAmount(totalAmount);
        }
    }, [addToCart]);

    return (isLoading ? <Loader /> :
        <div className="flex p-4 border border-gray-300 rounded-lg">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">My Addtocart</h1>
                <div className="grid grid-cols-1  gap-4">
                    {addToCart.map((item) => (
                        <AddToCartCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                {/* Top Section - Totals */}
                <div className="flex justify-between items-center w-full">
                    <div className="text-left">
                        <p className="text-gray-500 text-sm font-medium">
                            <span className="text-gray-800 font-semibold text-lg">{subItems}</span> items
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-sm font-medium">
                            Total:
                            <span className="text-gray-900 font-bold text-xl ml-2">
                                ₹{totalAmount.toLocaleString()}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Bottom Section - Button */}
                <div className="border-t border-gray-100 pt-4 sticky">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                      py-3 px-6 rounded-lg transition-all duration-200 shadow-sm
                      hover:shadow-md active:scale-95">
                        Proceed to Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCart