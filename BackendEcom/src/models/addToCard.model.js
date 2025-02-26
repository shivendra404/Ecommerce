import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },

}, { timestamps: true });

export const AddToCard = mongoose.model('AddToCard', addToCartSchema);

// import { useState, useEffect } from 'react';
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from './your-ui-library';

// // Reusable Product Form Component
// const ProductForm = ({ 
//   initialData = {}, 
//   onSubmit, 
//   brands, 
//   categories, 
//   onClose 
// }) => {
//   const [formData, setFormData] = useState({
//     productName: '',
//     brandId: '',
//     categoryId: '',
//     description: '',
//     price: '',
//     stock: '',
//     productImage: null,
//     ...initialData
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setFormData(prev => ({ ...prev, productImage: e.target.files[0] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="py-6 space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Product Name</label>
//         <input
//           type="text"
//           name="productName"
//           value={formData.productName}
//           onChange={handleInputChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Brand</label>
//           <select
//             name="brandId"
//             value={formData.brandId}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
//             required
//           >
//             <option value="">Select brand</option>
//             {brands.map(brand => (
//               <option key={brand._id} value={brand._id}>
//                 {brand.brandName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Category</label>
//           <select
//             name="categoryId"
//             value={formData.categoryId}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
//             required
//           >
//             <option value="">Select category</option>
//             {categories.map(category => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
//           rows="3"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Stock</label>
//           <input
//             type="number"
//             name="stock"
//             value={formData.stock}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
//             required
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           {initialData.prodImage ? 'Update Image' : 'Upload Image'}
//         </label>
//         <input
//           type="file"
//           name="productImage"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           required={!initialData.prodImage}
//         />
//       </div>

//       <div className="flex justify-end gap-4 mt-6">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           {initialData._id ? 'Update Product' : 'Add Product'}
//         </button>
//       </div>
//     </form>
//   );
// };

// // Main Product Management Component
// const ProductManagement = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // Fetch initial data
//   useEffect(() => {
//     // Add your data fetching logic here
//   }, []);

//   const handleFormSubmit = async (formData) => {
//     try {
//       if (selectedProduct) {
//         // Update product logic
//         console.log('Updating product:', formData);
//       } else {
//         // Create product logic
//         console.log('Creating product:', formData);
//       }
//       setOpenDialog(false);
//       setSelectedProduct(null);
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setOpenDialog(true);
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="mb-5 w-full flex justify-end">
//         <button 
//           onClick={() => setOpenDialog(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Add New Product
//         </button>
//       </div>

//       <Sheet open={openDialog} onOpenChange={() => {
//         setOpenDialog(false);
//         setSelectedProduct(null);
//       }}>
//         <SheetContent side="right" className="overflow-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {selectedProduct ? 'Edit Product' : 'Add New Product'}
//             </SheetTitle>
//           </SheetHeader>
          
//           <ProductForm
//             initialData={selectedProduct || {}}
//             onSubmit={handleFormSubmit}
//             brands={brands}
//             categories={categories}
//             onClose={() => {
//               setOpenDialog(false);
//               setSelectedProduct(null);
//             }}
//           />
//         </SheetContent>
//       </Sheet>

//       {/* Product Table (Keep your existing table structure) */}
//       <div className="container mx-auto p-6">
//         {/* ... Your existing table code ... */}
//         {/* Update your edit button to: */}
//         <button
//           onClick={() => handleEdit(product)}
//           className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
//         >
//           {/* Edit icon */}
//         </button>
//       </div>
//     </div>
//   );
// };