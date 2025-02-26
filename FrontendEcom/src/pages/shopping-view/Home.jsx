import { useState } from 'react';
import { Link } from 'react-router-dom'
import CollectionsSlider from './CollectionSlider';


const HomePage = () => {

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gray-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-2xl px-4">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Summer Essence 2025</h1>
            <p className="text-xl mb-8">Lightweight fabrics meet timeless elegance</p>
            <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full transition-all">
               <Link to={'/products'}>Explore Collection</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Collection Selector */}
      <CollectionsSlider />
      {/* Promotional Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-100 via-amber-50 to-stone-100 py-16 mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-grid-white/10"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
              Limited Time Offer
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Free Express Shipping
          </h2>

          <p className="text-xl md:text-2xl mb-8 font-light">
            On All Orders Over <span className="font-bold">$200</span>
          </p>

          <div className="flex justify-center items-center space-x-4">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold 
                        hover:bg-opacity-90 transition-all transform hover:scale-105
                        shadow-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <Link to={'/products'}> Shop Now</Link>
            </button>

            <div className="hidden sm:block text-sm text-white/80">
              Use code: <span className="font-mono font-bold">FREESHIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif mb-4">Join Our World</h2>
        <p className="text-gray-600 mb-6">Receive early access to new collections and exclusive offers</p>
        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border-b border-black focus:outline-none w-64"
          />
          <button className="bg-black text-white px-6 py-2 rounded-full">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;