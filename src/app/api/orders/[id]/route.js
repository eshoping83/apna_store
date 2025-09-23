import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

const orderSchema = new mongoose.Schema(
  {
    productId: String,
    productName: String,
    quantity: Number,
    totalPrice: Number,
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// Update order (status)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Order.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// Delete order
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Order.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
