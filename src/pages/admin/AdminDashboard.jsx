import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPackage, 
  FiShoppingBag, 
  FiUsers, 
  FiStar,
  FiTrendingUp,
  FiDollarSign,
  FiEye,
  FiImage
} from 'react-icons/fi';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingReviews: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, reviewsRes] = await Promise.all([
        axios.get('/products/admin/all'),
        axios.get('/orders/admin/all'),
        axios.get('/reviews/admin/all')
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;
      const reviews = reviewsRes.data;

      const totalRevenue = orders
        .filter(order => order.orderStatus === 'Delivered')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      const pendingReviews = reviews.filter(review => !review.isApproved).length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingReviews
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Manage Products',
      description: 'Add, edit, or remove products',
      icon: <FiPackage className="h-8 w-8" />,
      link: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: <FiShoppingBag className="h-8 w-8" />,
      link: '/admin/orders',
      color: 'bg-green-500'
    },
    {
      title: 'Review Management',
      description: 'Approve or reject reviews',
      icon: <FiStar className="h-8 w-8" />,
      link: '/admin/reviews',
      color: 'bg-yellow-500'
    },
    {
      title: 'Advertisements',
      description: 'Manage banner ads',
      icon: <FiImage className="h-8 w-8" />,
      link: '/admin/ads',
      color: 'bg-purple-500'
    }
  ];

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <FiPackage className="h-8 w-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FiShoppingBag className="h-8 w-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <FiDollarSign className="h-8 w-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: <FiStar className="h-8 w-8" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`inline-flex p-2 rounded-lg text-white ${action.color} mb-3`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                View All
                <FiEye className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Order #{order._id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customer.name} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Store Management</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/settings"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <FiTrendingUp className="mr-2 h-4 w-4" />
              Store Settings
            </Link>
            <Link
              to="/admin/ads"
              className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200"
            >
              <FiImage className="mr-2 h-4 w-4" />
              Manage Ads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;