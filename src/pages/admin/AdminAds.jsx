import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: { url: '', public_id: '' },
    link: '',
    order: 0
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get('/ads/admin/all');
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast.error('Error fetching advertisements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const adData = {
        ...formData,
        order: parseInt(formData.order)
      };

      if (editingAd) {
        await axios.put(`/ads/${editingAd._id}`, adData);
        toast.success('Advertisement updated successfully');
      } else {
        await axios.post('/ads', adData);
        toast.success('Advertisement created successfully');
      }

      setShowModal(false);
      setEditingAd(null);
      resetForm();
      fetchAds();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving advertisement');
    }
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      image: ad.image,
      link: ad.link || '',
      order: ad.order
    });
    setShowModal(true);
  };

  const handleDelete = async (adId) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      try {
        await axios.delete(`/ads/${adId}`);
        toast.success('Advertisement deleted successfully');
        fetchAds();
      } catch (error) {
        toast.error('Error deleting advertisement');
      }
    }
  };

  const handleToggleStatus = async (adId) => {
    try {
      await axios.patch(`/ads/${adId}/toggle`);
      toast.success('Advertisement status updated');
      fetchAds();
    } catch (error) {
      toast.error('Error updating advertisement status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: { url: '', public_id: '' },
      link: '',
      order: 0
    });
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advertisement Management</h1>
            <p className="text-gray-600 mt-2">Manage banner advertisements displayed on your website</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingAd(null);
              setShowModal(true);
            }}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Add Advertisement
          </button>
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Ad Image */}
              <div className="relative aspect-video">
                <img
                  src={ad.image.url}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                {!ad.isActive && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Inactive</span>
                  </div>
                )}
                {ad.link && (
                  <div className="absolute top-2 right-2">
                    <FiExternalLink className="h-4 w-4 text-white bg-black bg-opacity-50 rounded p-1" />
                  </div>
                )}
              </div>

              {/* Ad Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
                
                {ad.link && (
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    Link: {ad.link}
                  </p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Order: {ad.order}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ad.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {ad.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(ad)}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    <FiEdit className="mr-1 h-4 w-4" />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleToggleStatus(ad._id)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    {ad.isActive ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {ads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No advertisements yet</h2>
            <p className="text-gray-600 mb-8">
              Create your first advertisement to display on your website
            </p>
            <button
              onClick={() => {
                resetForm();
                setEditingAd(null);
                setShowModal(true);
              }}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <FiPlus className="mr-2 h-5 w-5" />
              Create Advertisement
            </button>
          </div>
        )}

        {/* Ad Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {editingAd ? 'Edit Advertisement' : 'Add New Advertisement'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Image URL</label>
                    <input
                      type="url"
                      value={formData.image.url}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        image: { ...prev.image, url: e.target.value }
                      }))}
                      className="form-input"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Link (Optional)</label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                      className="form-input"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="form-label">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: e.target.value }))}
                      className="form-input"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Lower numbers appear first in the slider
                    </p>
                  </div>

                  {/* Preview */}
                  {formData.image.url && (
                    <div>
                      <label className="form-label">Preview</label>
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={formData.image.url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      {editingAd ? 'Update Advertisement' : 'Create Advertisement'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingAd(null);
                        resetForm();
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAds;