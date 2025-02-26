import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e"
            alt="Clothing store interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-200">
            We're here to help and answer any questions you might have
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-light text-gray-800 mb-8">
              Send us a message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-light text-gray-800 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Our Store</h3>
                    <p className="text-gray-600">123 Fashion Avenue</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <PhoneIcon className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">Mon-Fri: 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">hello@fashionstore.com</p>
                    <p className="text-gray-600">support@fashionstore.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <ClockIcon className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Hours</h3>
                    <p className="text-gray-600">Mon-Fri: 10AM - 8PM</p>
                    <p className="text-gray-600">Saturday: 10AM - 6PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter', 'pinterest'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition-colors duration-300"
                  >
                    <span className="sr-only">{platform}</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {/* Add social media icons here */}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg">
         
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.1234567890123!2d77.2295!3d28.6128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcf0a1234567%3A0xabcdef123456789!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1629781006743!5m2!1sen!2sin"
            className="w-full h-96 border-0"
            allowFullScreen=""
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;