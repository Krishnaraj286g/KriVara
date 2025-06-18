import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdSlider = () => {
  const [ads, setAds] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % ads.length);
      }, 10000); // Auto-slide every 10 seconds

      return () => clearInterval(interval);
    }
  }, [ads.length]);

  const fetchAds = async () => {
    try {
      const response = await axios.get('/ads');
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  if (ads.length === 0) return null;

  return (
    <div className="relative h-40 w-full  sm:h-40 md:h-48 overflow-hidden bg-gray-100">
      {ads.map((ad, index) => (
        <div
          key={ad._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {ad.link ? (
            <a
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={ad.image.url}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </a>
          ) : (
            <img
              src={ad.image.url}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Overlay with title */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white text-lg font-semibold">{ad.title}</h3>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      {ads.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdSlider;