import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import axios from 'axios';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="KC Logo" className="h-10 w-50 rounded-md" />
              {/* <span className="text-xl font-bold">KVT</span> */}
            </div>
            <p className="text-gray-300 mb-4">
              {settings?.businessName || 'KRIVARA COUTURE'}
            </p>
            <p className="text-gray-400 text-sm">
            Delivering premium sarees and fashion wear since 2020. Proudly rooted in Elampillai’s textile tradition, serving customers across India.            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {settings?.contactDetails?.phone && (
                <div className="flex items-center space-x-2">
                  <FiPhone className="h-4 w-4 text-primary-400" />
                  <span className="text-gray-300">{settings.contactDetails.phone}</span>
                </div>
              )}
              {settings?.contactDetails?.email && (
                <div className="flex items-center space-x-2">
                  <FiMail className="h-4 w-4 text-primary-400" />
                  <span className="text-gray-300">{settings.contactDetails.email}</span>
                </div>
              )}
              {settings?.businessAddress && (
                <div className="flex items-start space-x-2">
                  <FiMapPin className="h-4 w-4 text-primary-400 mt-1" />
                  <div className="text-gray-300 text-sm">
                    {settings.businessAddress.street && <div>{settings.businessAddress.street}</div>}
                    {settings.businessAddress.city && settings.businessAddress.state && (
                      <div>{settings.businessAddress.city}, {settings.businessAddress.state}</div>
                    )}
                    {settings.businessAddress.pincode && <div>{settings.businessAddress.pincode}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {settings?.socialMedia?.facebook && (
                <a
                  href={settings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <FiFacebook className="h-6 w-6" />
                </a>
              )}
              {settings?.socialMedia?.instagram && (
                <a
                  href={settings.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <FiInstagram className="h-6 w-6" />
                </a>
              )}
              {settings?.socialMedia?.twitter && (
                <a
                  href={settings.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <FiTwitter className="h-6 w-6" />
                </a>
              )}
            </div>
            
            {/* Payment Info */}
            {settings?.paymentDetails?.gpayUpiId && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">Payment</h4>
                <p className="text-gray-400 text-sm">
                  UPI ID: {settings.paymentDetails.gpayUpiId}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {settings?.businessName || 'KRIVARA COUTURE'}. Created by Krishnaraj. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;