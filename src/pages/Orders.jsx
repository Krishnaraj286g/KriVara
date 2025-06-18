import React, { useState, useEffect } from 'react';
import { FiPackage, FiTruck, FiCheck, FiX, FiClock } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState({ show: false, orderId: null });
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    try {
      await axios.patch(`/orders/${cancelModal.orderId}/cancel`, {
        reason: cancelReason
      });
      
      toast.success('Order cancelled successfully');
      setCancelModal({ show: false, orderId: null });
      setCancelReason('');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error cancelling order');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Placed':
        return <FiClock className="h-5 w-5 text-blue-600" />;
      case 'Processing':
        return <FiPackage className="h-5 w-5 text-yellow-600" />;
      case 'Shipped':
        return <FiTruck className="h-5 w-5 text-purple-600" />;
      case 'Delivered':
        return <FiCheck className="h-5 w-5 text-green-600" />;
      case 'Cancelled':
        return <FiX className="h-5 w-5 text-red-600" />;
      default:
        return <FiClock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.orderStatus)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Order #{order._id.slice(-8)}
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={item.product.images?.[0]?.url || 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-medium text-gray-900">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        Payment: {order.paymentMethod} ({order.paymentStatus})
                      </p>
                      <p className="text-sm text-gray-600">
                        Delivery to: {order.shippingAddress.city}, {order.shippingAddress.state}
                      </p>
                      {order.orderStatus === 'Cancelled' && order.cancellationReason && (
                        <p className="text-sm text-red-600">
                          Cancelled: {order.cancellationReason}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <div className="text-xl font-bold text-primary-600">
                        Total: ₹{order.totalAmount.toLocaleString()}
                      </div>
                      {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
                        <button
                          onClick={() => setCancelModal({ show: true, orderId: order._id })}
                          className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancel Order Modal */}
        {cancelModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cancel Order
              </h3>
              <p className="text-gray-600 mb-4">
                Please provide a reason for cancelling this order:
              </p>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter cancellation reason..."
              />
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleCancelOrder}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => {
                    setCancelModal({ show: false, orderId: null });
                    setCancelReason('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Keep Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;