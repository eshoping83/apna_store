"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

export default function AdminPage() {
  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Product form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  // Restore login from sessionStorage so navigation from /admin keeps you logged in within this tab/session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const flag = window.sessionStorage.getItem("admin_logged_in");
      if (flag === "1") setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchProducts();
      fetchOrders(page);
    }
  }, [loggedIn, page]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin12345") {
      setLoggedIn(true);
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("admin_logged_in", "1");
        }
      } catch {}
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("/api/products responded with non-OK status:", res.status, text);
        toast.error("Failed to load products");
        setProducts([]);
        return;
      }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  async function fetchOrders(p = 1) {
    try {
      setLoadingOrders(true);
      const res = await fetch(`/api/orders?page=${p}&limit=${limit}`);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("/api/orders responded with non-OK status:", res.status, text);
        toast.error("Failed to load orders");
        setOrders([]);
        setPages(1);
        setTotal(0);
        return;
      }
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setOrders(data.data);
        setPages(data.pages || 1);
        setTotal(data.total || 0);
      } else {
        setOrders([]);
        setPages(1);
        setTotal(0);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
    finally {
      setLoadingOrders(false);
    }
  }

  async function handleRemoveOrder(id) {
    if (!confirm("Are you sure you want to permanently remove this order?")) return;
    setDeletingOrderId(id);
    try {
      await toast.promise(
        fetch(`/api/orders/${id}`, { method: "DELETE" }),
        {
          loading: "Removing order...",
          success: "Order removed",
          error: "Failed to remove order",
        }
      ).then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("DELETE /api/orders/", id, "failed:", text);
          throw new Error("Request failed");
        }
      });
      fetchOrders(page);
    } catch (err) {
      console.error("Error deleting order:", err);
    } finally {
      setDeletingOrderId(null);
    }
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) {
      toast.error("Please add an image URL (e.g., /images/product1.jpg)");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/products/${editId}` : "/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        let message = editId ? "Failed to update product" : "Failed to add product";
        try {
          const errJson = await res.json();
          if (errJson && errJson.error) message = errJson.error;
        } catch {}
        toast.error(message);
        return;
      }
      toast.success(editId ? "Product updated" : "Product added");
      setForm({ name: "", price: "", description: "", imageUrl: "" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to save product");
      console.error(err);
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      imageUrl: p.imageUrl,
    });
    setEditId(p._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error("Failed to delete");
        return;
      }
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  // --- Login Form ---
  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-500 to-pink-600">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-rose-600">
            Admin Login
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-rose-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-rose-400"
            required
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // --- Admin Panel ---
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {/* Header */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 py-10 text-center text-white">
        <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>
        <p className="mt-2 text-rose-100">Manage your products with ease</p>
      </section>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Back to Admin */}
        <div className="flex justify-between items-center">
          <Link
            href="/admin"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Admin
          </Link>
          <div className="text-sm text-gray-600">Total Orders: {total}</div>
        </div>

        {/* Orders List */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>
          {loadingOrders ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o._id} className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <p className="font-semibold">{o.productName || o.productId}</p>
                      <p className="text-sm text-gray-600">Quantity: {o.quantity} • Total: ${o.totalPrice}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{o?.customer?.name}</p>
                      <p className="text-sm text-gray-600">{o?.customer?.email}</p>
                      <p className="text-sm text-gray-600">{o?.customer?.phone}</p>
                      <p className="text-sm text-gray-600">{o?.customer?.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">Created: {o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</p>
                    <button
                      onClick={() => handleRemoveOrder(o._id)}
                      disabled={deletingOrderId === o._id}
                      aria-busy={deletingOrderId === o._id}
                      className={`text-sm font-semibold ${deletingOrderId === o._id ? "text-red-300 cursor-not-allowed" : "text-red-600 hover:text-red-700"}`}
                    >
                      {deletingOrderId === o._id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between border-t pt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
            className={`px-4 py-2 rounded-lg border ${page <= 1 ? "text-gray-400 border-gray-200" : "text-gray-800 border-gray-300 hover:bg-gray-50"}`}
          >
            ← Previous
          </button>
          <div className="text-sm text-gray-600">Page {page} of {pages}</div>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, pages))}
            disabled={page >= pages}
            className={`px-4 py-2 rounded-lg border ${page >= pages ? "text-gray-400 border-gray-200" : "text-gray-800 border-gray-300 hover:bg-gray-50"}`}
          >
            Next →
          </button>
        </div>

        {/* Product Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {editId ? "Edit Product" : "Add New Product"}
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-rose-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-rose-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-rose-400"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (e.g., /images/product1.jpg)"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-rose-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Products List */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => {
                const normalizeImageUrl = (u) => {
                  if (typeof u !== "string") return "/next.svg";
                  const t = u.trim();
                  if (!t) return "/next.svg";
                  if (t.startsWith("http://") || t.startsWith("https://")) return t;
                  if (t.startsWith("/")) return t;
                  return `/${t}`;
                };
                const imageSrc = normalizeImageUrl(p.imageUrl);
                return (
                  <div
                    key={p._id}
                    className="bg-white shadow-lg rounded-xl p-4 flex flex-col transition hover:shadow-2xl hover:scale-[1.02]"
                  >
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={imageSrc}
                        alt={p.name || 'Product image'}
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                    <p className="text-gray-600 font-medium mb-2">${p.price}</p>
                    <p className="text-gray-700 flex-grow">{p.description}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
