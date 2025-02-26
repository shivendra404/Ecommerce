
import React, { useState, Fragment, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import axios from 'axios';
import { toast } from 'sonner';
import Loader from '@/components/auth/Loader';



function AdminProducts() {

    const initialProductData = {
        productName: "",
        description: "",
        productImage: null,
        price: 0,
        stock: 0,
        categoryId: null,
        brandId: null,
    };

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialProductData);
    const [loading, setLoading] = useState(false);
    const [isLoader, setIsLoader] = useState(false)
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([])
    const [brands, setBrand] = useState([])
    const [products, setProducts] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageFileChange = (event) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFormData(prevData => ({
                ...prevData,
                productImage: selectedFile // Store the selected file in formData
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsLoader(true)
        setError(null);

        const data = new FormData();


        data.append('productImage', formData.productImage); // Append the image file
        data.append('productName', formData.productName);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('categoryId', formData.categoryId);
        data.append('brandId', formData.brandId);

        // Here you would typically send the data to your backend API

        // for (let [key, value] of data.entries()) {
        //     console.log(key, value);
        // }

        try {
            const response = await axios.post('http://localhost:9000/api/v1/product/registerProduct', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product added successfully:', response);
            if (response.data.success) {
                toast(response.data.message, {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                    style: {
                        backgroundColor: 'rgba(76, 175, 80, 0.8)', // Light green with transparency
                        color: '#FFFFFF'
                    },
                });

            }
            setFormData(initialProductData);
            setOpenCreateProductsDialog(false);
        } catch (err) {
            setError(err.message);
            console.error('Error adding product:', err);
            toast("Something wend Wrong", {
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
            setLoading(false);
            setIsLoader(false)
        }
    };



    useEffect(() => {
        const fetchAllBrands = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/brand/allBrand', {
                    withCredentials: true
                });

                // console.log("response", response?.data?.data);
                setBrand(response?.data?.data);



            } catch (error) {
                // console.error('Error fetching brands:', error);
                setError('Failed to fetch brands'); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchAllBrands(); // Call the function to fetch brands
    }, [loading]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/category/allCategories', {
                    withCredentials: true
                });
                // console.log(response);

                // console.log("response", response?.data?.data);
                setCategories(response?.data?.data);



            } catch (error) {
                // console.error('Error fetching brands:', error);
                setError('Failed to fetch brands'); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchAllCategories(); // Call the function to fetch brands
    }, [loading]);

    // useEffect(() => {
    //     const fetchAllCategories = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9000/api/v1/category/allCategories', {
    //                 withCredentials: true
    //             });
    //             // console.log(response);

    //             // console.log("response", response?.data?.data);
    //             setCategories(response?.data?.data);



    //         } catch (error) {
    //             // console.error('Error fetching brands:', error);
    //             setError('Failed to fetch brands'); // Set error message
    //         } finally {
    //             setLoading(false); // Set loading to false after fetching
    //         }
    //     };

    //     fetchAllCategories(); // Call the function to fetch brands
    // }, [loading]);


    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/product/getAllProduct', {
                    withCredentials: true
                });
                console.log(response);

                console.log("response", response?.data?.data);
                setProducts(response?.data?.data);



            } catch (error) {
                console.error('Error fetching brands:', error);
                setError('Failed to fetch brands');
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    // console.log(formData); 
    console.log(products);

    const handleEdit = (index) => {
        // Implement edit functionality here
        console.log('Edit product at index:', index);
    };

    const handleDelete = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    return (
        <div className='flex flex-col'>
            <div>
                <Fragment>
                    <div className='mb-5 w-full flex justify-end'>
                        <button onClick={() => setOpenCreateProductsDialog(true)} className="border border-gray-300 bg-gray-200 text-black font-semibold h-12 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer">
                            Add New Product
                        </button>
                    </div>
                    <Sheet className="bg-white" open={openCreateProductsDialog} onOpenChange={() => setOpenCreateProductsDialog(false)}>
                        <SheetContent side="right" className="overflow-auto bg-white">
                            <SheetHeader>
                                <SheetTitle>Add New Product</SheetTitle>
                            </SheetHeader>

                            <form onSubmit={onSubmit} className="py-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                                    <select
                                        name="brandId"
                                        value={formData.brandId}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a brand</option>
                                        {brands.map(brand => (
                                            <option key={brand._id} value={brand._id}>
                                                {brand.brandName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        placeholder="Enter product description"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        placeholder="Enter product price"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        placeholder="Enter stock quantity"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                    <input
                                        type="file"
                                        name='productImage'
                                        accept="image/*"
                                        onChange={handleImageFileChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">
                                    {isLoader ? <Loader /> : "Add Product"}
                                </button>
                            </form>

                        </SheetContent>
                    </Sheet>
                </Fragment >
            </div>
            <div className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-semibold text-gray-800">Product Management</h1>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className=" overflow-y-auto max-h-[400px] bg-white divide-y divide-gray-100">
                                {products.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100">
                                                <img
                                                    src={product.prodImage}
                                                    alt={product.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-800 font-medium">{product.productName}</span>
                                                <span className="text-gray-500 text-sm mt-1">{product.description}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                                                {product.category || 'Uncategorized'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {product.brand || 'N/A'}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(index)}
                                                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts 
