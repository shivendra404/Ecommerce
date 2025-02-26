import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet"; // Adjust the import path as necessary
import { toast } from 'sonner';

const initialBrandData = {
  brandName: "",
  brandOwnerName: "",
  email: "",
  phoneNumber: "",
  city: "",
  state: "",
  active: true,
  description: ""
};

function Brand() {
  const [openCreateBrandDialog, setOpenCreateBrandDialog] = useState(false);
  const [formData, setFormData] = useState(initialBrandData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [brandsData, setBrandsData] = useState([])

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


      const response = await axios.post(
        'http://localhost:9000/api/v1/brand/registerBrand',
        formData,
        {
          withCredentials: true // This allows sending cookies with the request
        }
      );
      console.log('Brand added successfully:', response.data);
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
      setFormData(initialBrandData);
      setOpenCreateBrandDialog(false);
    } catch (err) {
      setError(err.message);
      console.error('Error adding brand:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchAllBrands = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/v1/brand/allBrand', {
          withCredentials: true
        });

        console.log("response", response?.data?.data);
        setBrandsData(response?.data?.data);



      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Failed to fetch brands'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAllBrands(); // Call the function to fetch brands
  }, [loading]);
  console.log(brandsData);

  if (loading) return <div>Loading...</div>;

  // Render error state
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex flex-col overflow-x-auto'> <div>
      <button onClick={() => setOpenCreateBrandDialog(true)} className="border border-gray-300 bg-gray-200 text-black font-semibold h-12 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer">
        Add New Brand
      </button>

      <Sheet className="bg-white" open={openCreateBrandDialog} onOpenChange={() => setOpenCreateBrandDialog(false)}>
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>Add New Brand</SheetTitle>
          </SheetHeader>
          <form onSubmit={onSubmit} className="py-6 space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Enter brand name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Brand Owner Name</label>
              <input
                type="text"
                name="brandOwnerName"
                value={formData.brandOwnerName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Enter brand owner name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Enter city"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Enter state"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Active</label>
              <select
                name="active"
                value={formData.active}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
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

            <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">
              Add Brand
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">Brand Management</h1>
              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Brand", "Owner", "Contact", "Location", "Description", "Status"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {brandsData.map((brand) => (
                  <tr key={brand._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{brand.brandName}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{brand.brandOwnerName}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <a href={`mailto:${brand.email}`} className="text-sm text-blue-600 hover:underline">
                          {brand.email}
                        </a>
                        <span className="text-sm text-gray-500 mt-1">{brand.phoneNumber}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {brand.city}, {brand.state}
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div className="text-sm text-gray-500 truncate hover:whitespace-normal" title={brand.description}>
                        {brand.description}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${brand.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        <svg className={`w-2 h-2 mr-2 ${brand.active ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        {brand.active ? 'Active' : 'Inactive'}
                      </span>
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

export default Brand 
