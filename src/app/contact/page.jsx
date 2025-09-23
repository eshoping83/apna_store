"use client";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 pt-24 pb-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-rose-100 max-w-2xl mx-auto">
          We're here to help! Get in touch with us anytime.
        </p>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Name */}
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-rose-50 to-pink-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUser className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Name</h3>
            <p className="text-lg font-semibold text-rose-600">
              Sardar Nisar
            </p>
          </div>

          {/* Email */}
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-rose-50 to-pink-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Email</h3>
            <p className="text-lg font-semibold text-rose-600">
              eshoping83@gmail.com
            </p>
          </div>

          {/* Address */}
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-rose-50 to-pink-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Address</h3>
            <p className="text-lg font-semibold text-rose-600">
              E-11/2 Nathren Steep Clock Tower
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
