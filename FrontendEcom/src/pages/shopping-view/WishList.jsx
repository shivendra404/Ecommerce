import React from 'react';
import WishlistCard from '../../components/shopping-view/WishListCard'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';
import Loader from '@/components/auth/Loader';
import OrderCard from '@/components/shopping-view/OrderCard';

const WishList = () => {


    const { isLoading, wishListItems } = useSelector(state => state.wishList)
    console.log(wishListItems);
    // console.log(wishListItems);



    return (isLoading ? <Loader /> :

        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
            <div className="grid grid-cols-1  gap-4">
                {wishListItems.length != 0 ? wishListItems.map((item) => (
                    <WishlistCard key={item._id} item={item} />
                    // <OrderCard key={item._id} item={item} />
                )) :
                    <div className="flex justify-center items-center max-h-screen">
                        <h2 className="text-center text-xl">You have not any wishlist</h2>
                    </div>
                }
            </div>
        </div>
    );
};

export default WishList;