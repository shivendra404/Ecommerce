import React from 'react';
import { HeartIcon, GlobeAltIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const About = () => {


    // console.log("abouttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[80vh] bg-gray-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                        alt="Fashion showroom"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
                        Crafting Tomorrow's Fashion
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Where sustainable innovation meets timeless style
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-light text-gray-800 mb-6">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Born from a passion for ethical fashion and innovative design, ThreadCraft emerged in
                            2015 as a response to fast fashion's environmental impact. What started as a small
                            workshop in Milan has grown into a global movement, redefining luxury through
                            sustainability.
                        </p>
                        <p className="text-gray-600">
                            Our journey continues as we pioneer new eco-friendly materials while maintaining
                            the craftsmanship that Italian fashion is renowned for worldwide.
                        </p>
                    </div>
                    <div className="rounded-xl  h-[50vh] overflow-hidden shadow-lg">
                        <img
                            src="https://i.pinimg.com/474x/3c/3a/fa/3c3afa48db4d36d8e69b94f84d848c17.jpg"
                            alt="Tailoring process"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-light text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <GlobeAltIcon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Sustainable Ethics</h3>
                            <p className="text-gray-600">
                                100% organic materials and carbon-neutral production processes
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <SparklesIcon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Artisan Quality</h3>
                            <p className="text-gray-600">
                                Handcrafted details and premium construction that lasts
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <UserGroupIcon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Inclusive Community</h3>
                            <p className="text-gray-600">
                                Size-inclusive designs and fair wages for all workers
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
                <h2 className="text-3xl font-light text-center mb-12">Meet The Designers</h2>


                <div className="flex flex-col md:flex-row gap-8 p-8">
                    {/* Card 1 */}
                    <div className="flex-1 relative group overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Designer"
                            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6">
                            <h3 className="text-xl font-semibold text-white">Alessandro Rossi</h3>
                            <p className="text-gray-200">Creative Director</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex-1 relative group overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1581404917879-53e19259fdda?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Designer"
                            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6">
                            <h3 className="text-xl font-semibold text-white">Sophie Marceau</h3>
                            <p className="text-gray-200">Lead Stylist</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex-1 relative group overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Designer"
                            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6">
                            <h3 className="text-xl font-semibold text-white">James Donovan</h3>
                            <p className="text-gray-200">Textile Designer</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default About;