"use client";
import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Cloudinary details
  const CLOUD_NAME = "your_cloud_name"; // replace with your Cloudinary cloud name
  const UPLOAD_PRESET = "your_upload_preset"; // replace with your Cloudinary preset

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Adding product...");

    let finalImageUrl = imageUrl;

    try {
      // If file is selected → upload to Cloudinary
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.secure_url;
      }

      // Send product data to API
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          image: finalImageUrl,
        }),
      });

      if (res.ok) {
        setMessage("✅ Product added successfully!");
        setName("");
        setPrice("");
        setImageUrl("");
        setFile(null);
      } else {
        setMessage("❌ Error adding product.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading product.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        {/* Option 1: Upload from Gallery */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Upload from device:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Option 2: Paste Image URL */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Or paste image URL:
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
        >
          Add Product
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
