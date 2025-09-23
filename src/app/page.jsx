
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
        Welcome to <span className="text-rose-600">ApnaStore</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Shop the latest products with confidence.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Shop Now
      </Link>
    </section>
  );
}
