import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeart } from 'react-icons/fi';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import AdSlider from '../components/AdSlider';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/products?limit=8');
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: "Sarees",
      image: '/saree.png',
      description: 'Premium Sarees for special occasions, crafted to reflect elegance and tradition.'
    },
    {
      name: "Men's Wear",
      image: '/menswear.png',
      description:"Premium men’s wear for special occasions, crafted with elegance and tradition."
    },
    {
      name: 'Women’s Wear',
      image: 'WomensWear.png',
      description: "Premium women’s wear for special occasions, designed to celebrate grace and tradition."
    },
    {
      name: 'Daily Wear',
      image: 'dailywear.png',
      description: "Comfortable and stylish daily wear, crafted for everyday elegance."
    },
    {
      name:'Festive Wear',
      image: 'FestiveWear.png',
      description: "Vibrant festive wear crafted for joy, tradition, and timeless beauty."
    },
     {
      name:'Premium Edition',
      image: 'PremiemWear.png',
      description: "Exclusive premium edition wear, crafted for elegance, luxury, and distinction."
    },
     {
      name:'Ethnic Collections',
      image: 'Ethnicwear.png',
      description: "Celebrate heritage in style with our exquisite ethnic wear collection."
    },
     {
      name:'Other',
      image: 'Other.png',
      description: "Versatile fashion for all — from everyday essentials to special moments."
    },

  ];

  const features = [
    {
      icon: <FiStar className="h-8 w-8" />,
      title: 'Premium Quality',
      description: 'Handcrafted with finest materials and attention to detail'
    },
    {
      icon: <FiTruck className="h-8 w-8" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across Tamil Nadu'
    },
    {
      icon: <FiShield className="h-8 w-8" />,
      title: 'Trusted Brand',
      description: 'Serving customers since 2020 with excellence'
    },
    {
      icon: <FiHeart className="h-8 w-8" />,
      title: 'Customer Love',
      description: 'Thousands of satisfied customers across India'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AdSlider/>

      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Krivara Couture
                <span className="block text-yellow-300">Timeless Fashion & Quality</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
              Discover our exquisite range of sarees and fashion wear, crafted with tradition and excellence since 2020.              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Shop Now
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                // src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg"
                 src="/KrivaraCoutureFashion.png"
                alt="Premium Textiles"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse collection of premium sarees and fashion wear, designed for every occasion and every style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group card hover-lift overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular and trending products
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="aspect-square bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              View All Products
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose KC?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our commitment to quality and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Premium Quality?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust KC for their textile needs
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Start Shopping
            <FiArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
