"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("/api/products responded with non-OK status:", res.status, text);
        setProducts([]);
        return;
      }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 pt-20 pb-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Explore Our Products
        </h1>
        <p className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto">
          Discover a wide range of high-quality products designed to fit your needs.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No products found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group relative rounded-2xl shadow-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col">
                  <h2 className="text-lg font-bold text-gray-800 group-hover:text-rose-600 transition">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-rose-600 font-bold mt-3 text-lg">
                    ${product.price}
                  </p>
                  <button className="mt-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition self-start">
                    View Product
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
