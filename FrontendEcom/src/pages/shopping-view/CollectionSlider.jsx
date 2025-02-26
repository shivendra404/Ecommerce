
import { useState, useEffect } from 'react';
// import images from '../../../public/'

const ClothingSlider = () => {
    const collections = {
        latest: [
            { id: 1, name: 'Silk Evening Dress', price: '₹299', image: '/banner-1.webp' },
            { id: 2, name: 'Tailored Blazer', price: '₹199', image: '/banner-2.webp' },
            { id: 3, name: 'Floral Maxi Dress', price: '₹249', image: '/banner-3.webp' },
            { id: 4, name: 'Leather Jacket', price: '₹399', image: '/imageslider4.avif' },
            { id: 5, name: 'Cashmere Sweater', price: '₹179', image: '/imageslider5.avif' },
            { id: 6, name: 'Denim Overalls', price: '₹149', image: '/imageslider6.avif' },
            { id: 7, name: 'Velvet Gown', price: '₹499', image: '/imageslider7.avif' },
            { id: 8, name: 'Wool Trench Coat', price: '₹349', image: '/imageslider8.avif' },
            { id: 9, name: 'Lace Camisole', price: '₹89', image: '/imageslider3.avif' },
            { id: 10, name: 'Sequined Top', price: '₹129', image: '/clothslide1.avif' }
        ],
        featured: [
            { id: 1, name: 'Silk Evening Dress', price: '₹299', image: '/banner-1.webp' },
            { id: 2, name: 'Tailored Blazer', price: '₹199', image: '/banner-2.webp' },
            { id: 3, name: 'Floral Maxi Dress', price: '₹249', image: '/banner-3.webp' },
            { id: 4, name: 'Leather Jacket', price: '₹399', image: '/imageslider4.avif' },
            { id: 5, name: 'Cashmere Sweater', price: '₹179', image: '/imageslider5.avif' },
            { id: 6, name: 'Denim Overalls', price: '₹149', image: '/imageslider6.avif' },
            { id: 7, name: 'Velvet Gown', price: '₹499', image: '/imageslider7.avif' },
            { id: 8, name: 'Wool Trench Coat', price: '₹349', image: '/imageslider8.avif' },
            { id: 9, name: 'Lace Camisole', price: '₹89', image: '/imageslider3.avif' },
            { id: 10, name: 'Sequined Top', price: '₹129', image: '/clothslide1.avif' }
        ]
    };

    const [currentCollection, setCurrentCollection] = useState('latest');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const items = collections[currentCollection];
    const totalSlides = items.length;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [autoPlay, currentCollection, totalSlides]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Collection Selector */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => {
                        setCurrentCollection('latest');
                        setCurrentSlide(0);
                    }}
                    className={`px-6 py-2 rounded-full text-lg ${currentCollection === 'latest'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                >
                    Latest Collection
                </button>
                <button
                    onClick={() => {
                        setCurrentCollection('featured');
                        setCurrentSlide(0);
                    }}
                    className={`px-6 py-2 rounded-full text-lg ${currentCollection === 'featured'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                >
                    Featured Collection
                </button>
            </div>

            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="w-full  h-[32rem] flex-shrink-0 relative"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full  h-[32rem] h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-bold">{item.name}</h3>
                                <p className="text-xl">{item.price}</p>
                            </div>
                            <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full text-sm font-medium">
                                {currentCollection === 'latest' ? 'New Arrival' : 'Bestseller'}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClothingSlider;