import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet"; // Adjust the import path as necessary
import { toast } from 'react-toastify';
import Loader from '@/components/auth/Loader';

const initialCategoryData = {
  name: "",
  description: ""
};

function Category() {
  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);
  const [formData, setFormData] = useState(initialCategoryData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categoriesData, setCategoriesData] = useState([])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:9000/api/v1/category/createCategory', formData, {
        withCredentials: true
      });
      console.log(response.data.success);
      setFormData(initialCategoryData);
      setOpenCreateCategoryDialog(false);
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
    } catch (err) {
      setError(err.message);
      console.error('Error adding category:', err);
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
    }
  };


  useEffect(() => {
    const fetchAllBrands = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/v1/category/allCategories', {
          withCredentials: true
        });
        console.log(response);

        console.log("response", response?.data?.data);
        setCategoriesData(response?.data?.data);



      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBrands();
  }, [loading]);


  console.log(categoriesData);

  return (
    <>

      <div>
        <button onClick={() => setOpenCreateCategoryDialog(true)} className="border border-gray-300 bg-gray-200 text-black font-semibold h-12 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer">
          {loading ? <Loader /> : "Add New Category"}
        </button>

        <Sheet className="bg-white" open={openCreateCategoryDialog} onOpenChange={() => setOpenCreateCategoryDialog(false)}>
          <SheetContent side="right" className="overflow-auto bg-white">
            <SheetHeader className="flex ">
              <SheetTitle>Add New Category</SheetTitle>
            </SheetHeader>
            <form onSubmit={onSubmit} className="py-6 space-y-4">
              {error && <div className="text-red-500">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  placeholder="Enter description"
                  required
                />
              </div>
              <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600" disabled={loading}>
                {loading ? 'Adding...' : 'Add Category'}
              </button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h1 className="text-2xl font-semibold text-gray-800">Product Categories</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {categoriesData.map(category => (
                  <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-prose">
                        {category.description || (
                          <span className="text-gray-400 italic">No description</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {categoriesData.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-2">📁</div>
              <p className="text-gray-500">No categories found</p>
            </div>
          )}
        </div>
      </div></>
  );
}

export default Category;