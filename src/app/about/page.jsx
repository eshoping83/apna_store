"use client";
import React from "react";

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center space-y-6 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-600">
          About Us
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
          ModernStore is built to deliver stylish products with a seamless shopping experience. Our goal is to bring quality, comfort, and joy to every customer.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
            <i className="fas fa-truck"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Enjoy quick and reliable delivery on all your orders, ensuring you get your products when you need them.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
            <i className="fas fa-headset"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600 text-sm">
            Our customer support team is always available to answer your questions and assist with any issues.
          </p>
        </div>

        {/* Card 3 - replaced Secure Payments */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
            <i className="fas fa-gem"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
          <p className="text-gray-600 text-sm">
            We carefully select our products to ensure the highest quality for our customers.
          </p>
        </div>
      </div>
    </section>
  );
}
