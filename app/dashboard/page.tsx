"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
import Navbar from "../../component/Navbar";
import RecommendationCard from "../../component/RecommendationCard";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  TRANSFER: "#34D399",  // green
  DONATE: "#A78BFA",    // purple
  DISCOUNT: "#FBBF24",  // yellow
  MONITOR: "#EC4899",   // pink
};

interface Recommendation {
  id: number;
  Recommendation: string;
  [key: string]: unknown;
}

export default function DashboardPage() {
  const { userId } = useAuth();
const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/recommendations", {
          cache: "no-store",
        });
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!userId) {
    return <RedirectToSignIn />;
  }

  // prepare data for pie chart
  const summaryData = ["TRANSFER", "DONATE", "DISCOUNT", "MONITOR"].map(type => ({
    name: type,
    value: recommendations.filter(rec => rec.Recommendation === type).length,
  }));

  // filter data
  const filteredData = filter
    ? recommendations.filter(rec => rec.Recommendation === filter)
    : recommendations;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900 
          text-gray-900 dark:text-gray-100 flex flex-col px-4">
        
        <div className="w-full max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold">Hello 👋</h1>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Welcome to your Smart Waste Tracker dashboard.
            </p>
          </div>

          {/* 🥧 Pie Chart Summary */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">📊 Summary</h2>
            <div className="w-full h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive
                    data={summaryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {summaryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 🛠 Filter Bar */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            {["TRANSFER", "DONATE", "DISCOUNT", "MONITOR"].map(type => (
              <button
                key={type}
                onClick={() => setFilter(filter === type ? null : type)}
                className={`px-4 py-2 rounded-full font-semibold 
                  transition ${
                    filter === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
              >
                {type}
              </button>
            ))}
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                !filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Show All
            </button>
          </div>

          {/* 🚀 Recommendations */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">
              {filter ? `Showing: ${filter}` : "All Recommendations"}
            </h2>
            {loading ? (
              <div className="text-center py-10">Loading recommendations...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((rec, idx) => (
                  <RecommendationCard key={idx} rec={rec} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
