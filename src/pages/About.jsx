import React from 'react';
import { FiAward, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: <FiAward className="h-8 w-8" />, number: '4+', label: 'Years of Excellence' },
    { icon: <FiUsers className="h-8 w-8" />, number: '2,000+', label: 'Happy Customers' },
    { icon: <FiTrendingUp className="h-8 w-8" />, number: '50+', label: 'Cities Served' },
    { icon: <FiHeart className="h-8 w-8" />, number: '4.8/5', label: 'Customer Rating' }
  ];

 



 

  const milestones = [
  {
    year: '2020',
    title: 'Humble Beginnings',
    description: 'Started retailing sarees across India from Elampillai, Tamil Nadu with no investment'
  },
  {
    year: '2021',
    title: 'Community Support',
    description: 'Grew through the support of the Elampillai textile community and learned the industry hands-on'
  },
  {
    year: '2022',
    title: 'Brand Building',
    description: 'Earned strong customer trust and positive feedback, laying the foundation for a unique brand'
  },
  {
    year: '2023',
    title: 'Krivara Couture Launch',
    description: 'Officially established Krivara Couture with a focus on quality sarees, men’s and women’s wear'
  },
  {
    year: '2024',
    title: 'Pan-India Vision',
    description: 'Aiming to expand Krivara Couture across India with accessible, premium-quality fashion'
  }
];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Krivara Couture
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Krivara is a graceful name inspired by Krishna and Vara, meaning divine blessing, while Couture represents high-end, custom-made fashion rooted in elegance and craftsmanship.</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
             

              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  The story of <strong>Krivara Couture</strong> began in <strong>2020</strong>, from the vibrant textile town of <strong>Elampillai, Salem, Tamil Nadu</strong> — a place known across India for its weaving heritage, premium fabrics, and traditional craftsmanship.
                </p>
                <p>
                  With no initial investment, I started by retailing sarees across India, driven by a passion for textiles and supported by the strength of the <strong>Elampillai textile community</strong>. Their guidance and support helped me learn the business step-by-step, turning small beginnings into a growing vision.
                </p>
                <p>
                  As we earned the trust of our customers through quality, fair pricing, and word-of-mouth recommendations, I felt inspired to build something of my own — and that’s how <strong>Krivara Couture</strong> was born.
                </p>
                <p>
                  Today, Krivara Couture offers a curated range of <strong>sarees, men’s and women’s wear, and premium clothing</strong> — all designed to blend tradition with modern style. Each piece reflects our commitment to quality, craftsmanship, and accessibility.
                </p>
                <p>
                  Our vision is to grow Krivara Couture into a trusted fashion destination across <strong>India and beyond</strong>, while celebrating the legacy of Elampillai’s textile tradition.
                </p>
                <p>
                  This journey would not be possible without the support of the Elampillai community and the continuous encouragement from our customers. We thank you for being a part of our story.
                </p>
              </div>

            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg"
                alt="K. Vishwanathan Tex Workshop"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">2011</div>
                  <div className="text-sm">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our growth story
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-primary-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-md"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product is crafted with the finest materials and attention to detail.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Love</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. Their satisfaction and trust drive our success.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Growth</h3>
              <p className="text-gray-600">
                We constantly innovate and expand our offerings while staying true to our traditional roots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Our Quality?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust KC for their textile needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;