import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const isDev = process.env.NODE_ENV !== "production";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
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

// GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products", ...(isDev ? { details: String(err?.message || err) } : {}) },
      { status: 500 }
    );
  }
}

// POST add product
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    // Debug log to verify payload reaching the API (does not change logic/UI)
    console.log("[POST /api/products] Incoming payload:", body);
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: "Failed to create product", ...(isDev ? { details: String(err?.message || err) } : {}) },
      { status: 500 }
    );
  }
}
