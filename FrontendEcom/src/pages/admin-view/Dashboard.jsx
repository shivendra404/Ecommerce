import {
  ChartBarIcon,
  CogIcon,
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  BellIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {

  console.log("AdminDashboard iiiiiiiiiiiiiiiiiiiiiiiiiiii");

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BellIcon className="w-6 h-6 text-gray-600" />
              <span className="sr-only">Notifications</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src="https://i.pinimg.com/474x/e7/57/dd/e757ddb889de99ba3655a0f7011a57ca.jpg"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </div>
        </header>

        {/* Main */}
        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold mt-2">1,234</p>
                </div>
                <UsersIcon className="w-12 h-12 text-blue-500 bg-blue-100 p-2 rounded-lg" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold mt-2">567</p>
                </div>
                <ShoppingCartIcon className="w-12 h-12 text-green-500 bg-green-100 p-2 rounded-lg" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold mt-2">890</p>
                </div>
                <CurrencyDollarIcon className="w-12 h-12 text-purple-500 bg-purple-100 p-2 rounded-lg" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold mt-2">$12,345</p>
                </div>
                <ChartBarIcon className="w-12 h-12 text-red-500 bg-red-100 p-2 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
              {/* Add your chart component here */}
              <div className="h-64 bg-gray-50 rounded-lg"></div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
              {/* Add your chart component here */}
              <div className="h-64 bg-gray-50 rounded-lg"></div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-t border-gray-100">
                    <td className="py-3">#00{item}</td>
                    <td className="py-3">Customer {item}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Completed
                      </span>
                    </td>
                    <td className="py-3">$12{item}.00</td>
                    <td className="py-3">2023-09-{item.toString().padStart(2, '0')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;