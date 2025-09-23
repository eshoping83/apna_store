"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (data.imageUrl && !data.imageUrl.startsWith("http") && !data.imageUrl.startsWith("/")) {
        data.imageUrl = `/${data.imageUrl}`;
      }

      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  }

  if (!product) return <p>Loading...</p>;

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          productName: product.name,
          quantity,
          totalPrice,
          customer,
        }),
      });

      if (res.ok) {
        toast.success("Order placed successfully!");
        setShowForm(false);
        setQuantity(1);
        setCustomer({ name: "", email: "", phone: "", address: "" });
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md space-y-6">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-rose-600 font-bold text-xl">${totalPrice}</p>

          <div className="flex items-center gap-3">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-rose-600 text-white py-2 px-6 rounded hover:bg-rose-700 transition"
          >
            {showForm ? "Cancel" : "Buy Now"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded shadow space-y-4 max-w-lg mx-auto"
        >
          <h2 className="text-xl font-bold text-gray-900 text-center">Delivery Information</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
          >
            Submit Order
          </button>
        </form>
      )}
    </div>
  );
}
