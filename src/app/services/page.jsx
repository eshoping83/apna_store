"use client";
import { FaShippingFast, FaHeadset, FaGift, FaCrown, FaCheck } from "react-icons/fa";

export default function ServicesPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 pt-24 pb-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-rose-100 max-w-2xl mx-auto">
          We provide complete e-commerce solutions designed to make your
          shopping experience smooth, secure, and enjoyable.
        </p>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600">
              Premium shopping services for every customer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Fast Delivery */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mb-6">
                <FaShippingFast className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day and next-day delivery available in major cities with
                real-time tracking.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-6">
                <FaHeadset className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Get instant help anytime through live chat, phone, or email.
              </p>
            </div>

            {/* Gift Services */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center mb-6">
                <FaGift className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gift Services</h3>
              <p className="text-gray-600">
                Make every occasion special with gift wrapping, greeting cards,
                and scheduled delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Services</h2>
            <p className="text-lg text-gray-600">
              Exclusive benefits for our valued customers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Apna Prime */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <FaCrown className="text-white text-xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Apna Prime</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Join our premium membership for faster delivery, exclusive
                discounts, and more.
              </p>
              <ul className="space-y-3 mb-2">
                <li className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-2" /> Free express delivery
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-2" /> Early access to sales
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-2" /> Member-only deals
                </li>
              </ul>
            </div>

            {/* Gift Services Detailed */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mr-4">
                  <FaGift className="text-white text-xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Special Gifts</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Choose from personalized options that make your gifts truly
                memorable.
              </p>
              <ul className="space-y-3 mb-2">
                <li className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-2" /> Gift wrapping & cards
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-2" /> Scheduled delivery
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-2" /> Surprise packages
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Our Services?</h2>
          <p className="text-lg mb-8 text-rose-100">
            Thousands of happy customers already trust ApnaStore. Be the next.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/products"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all"
            >
              Start Shopping
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
