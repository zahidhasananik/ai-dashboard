import React, { useState } from 'react';
import { mockStats, mockSalesData, mockProducts } from './data';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // সার্চ লজিক
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✨ ইন্টেলিজেন্ট মক এআই ইঞ্জিন (কোনো API Key বা প্রক্সি লাগবে না!)
  const fetchAIInsights = () => {
    setLoading(true);
    setShowModal(true);
    setAiInsight("AI Engine is scanning dashboard parameters... 🔮");

    // ঠিক রিয়েল এআই এর মতো ২ সেকেন্ড লোডিং ইফেক্ট তৈরি করা
    setTimeout(() => {
      const insightsList = [
        "🤖 **BizInsight AI Executive Summary:**\n\n",
        "📈 **Sales Surge:** Total sales have expanded by **+12%** this month ($24,500). The upward momentum in the chart indicates strong end-of-quarter performance.",
        "⚠️ **Inventory Warning:** 'Wireless Headphones' and 'Leather Wallet' are running critically low on stock (< 20 units left). Restock immediately to prevent revenue leakage.",
        "💡 **Retention Opportunity:** Active Subscriptions dropped slightly by **-3%**. Consider launching a loyalty email campaign next week to recapture churned subscribers."
      ];
      
      setAiInsight(insightsList.join("\n\n"));
      setLoading(false);
    }, 2000); // ২ সেকেন্ড পর চমৎকার রেসপন্স আসবে
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-indigo-400 mb-8">✨ BizInsight</h1>
          <nav className="space-y-4">
            <a href="#" className="block py-2.5 px-4 rounded bg-indigo-600 font-medium text-white transition">📊 Dashboard</a>
            <a href="#" className="block py-2.5 px-4 rounded hover:bg-slate-800 text-slate-300 transition">📦 Products</a>
            <a href="#" className="block py-2.5 px-4 rounded hover:bg-slate-800 text-slate-300 transition">⚙️ Settings</a>
          </nav>
        </div>
        <div className="text-sm text-slate-500 border-t border-slate-800 pt-4">
          Logged in as: <span className="text-slate-300 font-medium">Junior Dev</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Business Analytics</h2>
            <p className="text-gray-500 mt-1">Welcome back! Here is your business overview.</p>
          </div>
          <button 
            onClick={fetchAIInsights}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <span>{loading ? "⚡" : "✨"}</span> {loading ? "Analyzing Data..." : "Generate AI Insights"}
          </button>
        </header>

        {/* STATS CARDS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.title}</p>
              <div className="flex items-baseline justify-between mt-4">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</span>
                <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                  stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* 📊 VISUALIZATION SECTION */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sales Performance Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 📦 DATA TABLE SECTION */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900">Product Inventory & Sales</h3>
            <input
              type="text"
              placeholder="Search products or category..."
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 text-sm transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-4 px-6">Product Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock Status</th>
                  <th className="py-4 px-6">Units Sold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                    <td className="py-4 px-6 text-gray-500">{product.category}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900">{product.price}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.stock < 20 ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {product.stock} left {product.stock < 20 && '⚠️'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-indigo-600">{product.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* 🧠 AI INSIGHTS POPUP MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">🤖 AI Business Intelligence</h3>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white text-xl font-bold focus:outline-none">✕</button>
            </div>
            <div className="p-6">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base font-medium">
                {aiInsight}
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition"
                >
                  Close Insights
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}