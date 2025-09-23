"use client";
import { useState, useEffect } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  async function editProduct(id) {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    fetchProducts();
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-rose-600">All Products</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow hover:shadow-lg p-4 transition transform hover:-translate-y-1"
          >
            <img src={p.imageUrl} alt={p.name} className="h-40 w-full object-cover rounded-md mb-3" />
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-600">${p.price}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => editProduct(p._id)}
                className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(p._id)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
