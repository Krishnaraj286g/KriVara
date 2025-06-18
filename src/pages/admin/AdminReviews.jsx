import React, { useState, useEffect } from 'react';
import { FiSearch, FiCheck, FiX, FiStar, FiEye } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/reviews/admin/all');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReview = async (reviewId, isApproved) => {
    try {
      await axios.patch(`/reviews/${reviewId}/approve`, { isApproved });
      toast.success(`Review ${isApproved ? 'approved' : 'rejected'} successfully`);
      fetchReviews();
    } catch (error) {
      toast.error('Error updating review status');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`/reviews/${reviewId}`);
        toast.success('Review deleted successfully');
        fetchReviews();
      } catch (error) {
        toast.error('Error deleting review');
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? 'fill-current text-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'approved' && review.isApproved) ||
      (statusFilter === 'pending' && !review.isApproved);
    
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-gray-600 mt-2">Manage and moderate customer reviews</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Reviews</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {review.customer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{review.customer.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{review.product.name}</p>
                <p className="text-xs text-gray-500">{review.product.category}</p>
              </div>

              {/* Review Comment */}
              <div className="mb-4">
                <p className="text-gray-700">{review.comment}</p>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  review.isApproved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {review.isApproved ? 'Approved' : 'Pending'}
                </span>

                <div className="flex space-x-2">
                  {!review.isApproved && (
                    <button
                      onClick={() => handleApproveReview(review._id, true)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      title="Approve Review"
                    >
                      <FiCheck className="h-4 w-4" />
                    </button>
                  )}
                  
                  {review.isApproved && (
                    <button
                      onClick={() => handleApproveReview(review._id, false)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                      title="Unapprove Review"
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete Review"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <FiStar className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No reviews found</h2>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No customer reviews yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;