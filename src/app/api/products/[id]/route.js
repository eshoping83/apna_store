import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Type definitions for better code completion
/**
 * @typedef {Object} Product
 * @property {string} _id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {string} imageUrl
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Connects to MongoDB if not already connected
 * @returns {Promise<void>}
 */
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }
  return mongoose.connect(MONGODB_URI);
}

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

// Get single product
export async function GET(request, { params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// Update product
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('Error updating product:', err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// Delete product
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error('Error deleting product:', err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
