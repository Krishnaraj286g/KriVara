import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (user.role === 'admin') {
      toast.error('Admin cannot add items to cart');
      return;
    }

    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }

    addToCart(product);
    toast.success('Product added to cart');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="fill-current text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="fill-current text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <Link to={`/products/${product._id}`} className="group">
      <div className="card hover-lift overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images?.[0]?.url || 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Stock badge */}
          {product.stock <= 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Out of Stock
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 text-truncate-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 text-truncate-2">
            {product.description}
          </p>

          {/* Rating */}
          {product.totalReviews > 0 && (
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex space-x-1">
                {renderStars(product.averageRating)}
              </div>
              <span className="text-sm text-gray-500">
                ({product.totalReviews})
              </span>
            </div>
          )}

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary-600">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>

          {/* Add to Cart Button */}
          {user && user.role !== 'admin' && (
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                product.stock <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <FiShoppingCart className="h-4 w-4" />
              <span>{product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;