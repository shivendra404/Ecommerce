
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '@/components/auth/Loader';
import OrderCard from '@/components/shopping-view/OrderCard';

const Orders = () => {



    const { isLoading, OrderItems } = useSelector(state => state.order)
    // console.log(wishlistItem);
    // console.log(OrderItems);



    return (isLoading ? <Loader /> :
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <div className="grid grid-cols-1  gap-4">
                {OrderItems.map((item) => (
                    <OrderCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};



export default Orders


