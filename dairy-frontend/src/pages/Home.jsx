import React from "react";
import {useNavigate} from 'react-router-dom'

export default function Home() {
  const navigate=useNavigate();
  const products = [
    {
      name: "Fresh Milk",
      description: "Pure and fresh farm milk delivered to your doorstep.",
      price: "₹60 / Liter",
      emoji: "🥛",
    },
    {
      name: "Fresh Curd",
      description: "Creamy and naturally prepared fresh curd.",
      price: "₹50 / 500g",
      emoji: "🍶",
    },
    {
      name: "Paneer",
      description: "Soft and fresh paneer made from quality milk.",
      price: "₹90 / 250g",
      emoji: "🧀",
    },
    {
      name: "Ghee",
      description: "Pure homemade-style ghee with rich natural flavor.",
      price: "₹550 / Liter",
      emoji: "🫙",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="text-3xl">🥛</div>
            <h1 className="text-2xl font-bold text-green-700">
              FreshDairy
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <a href="#home" className="hover:text-green-700">
              Home
            </a>
            <a href="#products" className="hover:text-green-700">
              Products
            </a>
            <a href="#about" className="hover:text-green-700">
              About
            </a>
            <a href="#contact" className="hover:text-green-700">
              Contact
            </a>
          </div>

          <button
           onClick={()=>navigate('/login')} className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-green-50 to-emerald-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28
                        grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="inline-block bg-green-100 text-green-700
                             px-4 py-2 rounded-full text-sm font-semibold mb-5">
              🌿 Fresh From Local Farms
            </span>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight
                           text-gray-900">
              Pure Dairy.
              <span className="text-green-600"> Fresh Every Day.</span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Enjoy fresh, pure and high-quality dairy products directly
              from trusted local farmers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                className="bg-green-600 text-white px-7 py-3 rounded-lg
                           font-semibold hover:bg-green-700 transition"
              >
                Order Now
              </button>

              <button
                className="border border-green-600 text-green-700
                           px-7 py-3 rounded-lg font-semibold
                           hover:bg-green-50 transition"
              >
                Explore Products
              </button>

            </div>
          </div>

          {/* Hero Image Area */}
          <div className="flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-10
                            w-full max-w-md text-center">

              <div className="text-8xl mb-5">
                🐄
              </div>

              <h3 className="text-2xl font-bold text-gray-800">
                Farm Fresh
              </h3>

              <p className="mt-2 text-gray-500">
                Quality you can trust, freshness you can taste.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="text-2xl">🥛</div>
                  <p className="text-xs mt-1">Fresh</p>
                </div>

                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="text-2xl">🌱</div>
                  <p className="text-xs mt-1">Natural</p>
                </div>

                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="text-2xl">❤️</div>
                  <p className="text-xs mt-1">Healthy</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-green-50">
            <div className="text-3xl mb-3">🌿</div>
            <h3 className="font-bold text-lg">100% Fresh</h3>
            <p className="text-gray-600 mt-2">
              Fresh dairy products sourced from trusted farmers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50">
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="font-bold text-lg">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">
              Get your favorite dairy products delivered quickly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-bold text-lg">Quality Assured</h3>
            <p className="text-gray-600 mt-2">
              We maintain high standards for every product.
            </p>
          </div>

        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold">
              OUR PRODUCTS
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Fresh Dairy Products
            </h2>

            <p className="text-gray-500 mt-3">
              Choose from our range of fresh and quality dairy products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl shadow-sm border
                           border-gray-100 overflow-hidden
                           hover:shadow-lg hover:-translate-y-1
                           transition duration-300"
              >

                <div className="bg-green-50 h-48 flex items-center
                                justify-center">
                  <span className="text-7xl">
                    {product.emoji}
                  </span>
                </div>

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 min-h-10">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-5">

                    <span className="font-bold text-green-700">
                      {product.price}
                    </span>

                    <button
                      className="bg-green-600 text-white px-4 py-2
                                 rounded-lg text-sm font-semibold
                                 hover:bg-green-700 transition"
                    >
                      Order
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="bg-green-700 text-white py-20"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            From Our Farmers to Your Family
          </h2>

          <p className="mt-5 text-green-100 text-lg leading-relaxed">
            Our dairy management system connects farmers and customers,
            helping us deliver fresh and quality dairy products while
            supporting local farmers.
          </p>

          <button
            className="mt-8 bg-white text-green-700 px-7 py-3
                       rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Order Your Dairy Products
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-gray-300 py-8"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col
                        md:flex-row justify-between gap-4">

          <div>
            <h3 className="text-xl font-bold text-white">
              🥛 FreshDairy
            </h3>
            <p className="text-sm mt-2">
              Freshness you can trust.
            </p>
          </div>

          <div className="text-sm">
            <p>Contact: support@freshdairy.com</p>
            <p className="mt-1">© 2026 FreshDairy. All rights reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}