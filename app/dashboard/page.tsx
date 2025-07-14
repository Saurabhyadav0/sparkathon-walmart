"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
import Navbar from "../../component/Navbar";
import RecommendationCard from "../../component/RecommendationCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = {
  TRANSFER: "#34D399",
  DISCOUNT: "#FBBF24",
  DONATE: "#A78BFA",
  MONITOR: "#EC4899",
  NONE: "#38BDF8",
};

interface Recommendation {
  id: number;
  Recommendation: string;
  [key: string]: unknown;
}

export default function DashboardPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  const knownTypes = ["TRANSFER", "DISCOUNT", "DONATE", "MONITOR"];

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
  const username = user?.firstName || user?.username || "User";

  const fullSummaryData = [
    ...knownTypes.map(type => ({
      name: type,
      value: recommendations.filter(
        rec => rec.Recommendation?.trim().toUpperCase() === type
      ).length,
    })),
    {
      name: "NONE",
      value: recommendations.filter(
        rec => !knownTypes.includes(rec.Recommendation?.trim().toUpperCase())
      ).length,
    },
  ];

  const filteredSummaryData = filter
    ? fullSummaryData.filter(d => d.name === filter)
    : fullSummaryData;

  const filteredData =
    filter === "NONE"
      ? recommendations.filter(
          rec => !knownTypes.includes(rec.Recommendation?.trim().toUpperCase())
        )
      : filter
      ? recommendations.filter(
          rec => rec.Recommendation?.trim().toUpperCase() === filter
        )
      : recommendations;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 px-4 transition-all duration-700">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* 👋 Welcome Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold">Welcome, {username} 👋</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Here’s an overview of your current waste recommendations and insights.
            </p>
          </div>

          {/* 📈 Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">📊 Summary Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie dataKey="value" data={filteredSummaryData} cx="50%" cy="50%" outerRadius={100} label>
                    {filteredSummaryData.map((entry, index) => (
                      <Cell key={`pie-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">📈 Recommendations Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredSummaryData}>
                  <XAxis dataKey="name" tick={{ fill: "#8884d8" }} />
                  <YAxis tick={{ fill: "#8884d8" }} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {filteredSummaryData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 🔘 Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {["TRANSFER", "DISCOUNT", "DONATE", "MONITOR", "NONE"].map(type => (
              <button
                key={type}
                onClick={() => setFilter(filter === type ? null : type)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
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
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                !filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Show All
            </button>
          </div>

          {/* 🔍 Recommendation Cards */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">
              {filter ? `Filtered Recommendations: ${filter}` : "All Smart Recommendations"}
            </h2>
            {loading ? (
              <div className="text-center py-12 text-gray-500">⏳ Loading recommendations...</div>
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





// "use client";

// import { useEffect, useState } from "react";
// import { useAuth,useUser } from "@clerk/nextjs";
// import { RedirectToSignIn } from "@clerk/nextjs";
// import Navbar from "../../component/Navbar";
// import RecommendationCard from "../../component/RecommendationCard";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
// } from "recharts";

// const COLORS = {
//   TRANSFER: "#34D399",  // green
//   DISCOUNT: "#FBBF24",  // yellow
//   DONATE: "#A78BFA",    // purple
//   MONITOR: "#EC4899",   // pink
//   NONE: "#38BDF8",      // sky blue
// };

// interface Recommendation {
//   id: number;
//   Recommendation: string;
//   [key: string]: unknown;
// }

// export default function DashboardPage() {
//   const { userId } = useAuth();
//   const { user } = useUser();
//   const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState<string | null>(null);

//   const knownTypes = ["TRANSFER", "DISCOUNT", "DONATE", "MONITOR"];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/recommendations", {
//           cache: "no-store",
//         });
//         const data = await res.json();
//         setRecommendations(data);
//       } catch (err) {
//         console.error("Failed to fetch recommendations:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!userId) {
//     return <RedirectToSignIn />;
//   }
//   const username = user?.firstName || user?.username || "User";

//   const fullSummaryData = [
//     ...knownTypes.map(type => ({
//       name: type,
//       value: recommendations.filter(
//         rec => rec.Recommendation?.trim().toUpperCase() === type
//       ).length,
//     })),
//     {
//       name: "NONE",
//       value: recommendations.filter(
//         rec => !knownTypes.includes(rec.Recommendation?.trim().toUpperCase())
//       ).length,
//     },
//   ];

//   const filteredSummaryData = filter
//     ? fullSummaryData.filter(d => d.name === filter)
//     : fullSummaryData;

//   const filteredData =
//     filter === "NONE"
//       ? recommendations.filter(
//           rec => !knownTypes.includes(rec.Recommendation?.trim().toUpperCase())
//         )
//       : filter
//       ? recommendations.filter(
//           rec => rec.Recommendation?.trim().toUpperCase() === filter
//         )
//       : recommendations;

//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900 
//           text-gray-900 dark:text-gray-100 flex flex-col px-4"
//       >
//         <div className="w-full max-w-6xl mx-auto space-y-10">
//           <h1 className="text-4xl font-bold">Hello {username}</h1>

//           <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
//             <p className="text-lg text-gray-700 dark:text-gray-300">
//              Track and optimize your waste management with smart, real-time recommendations.
//             </p>
//           </div>

//           {/* 🥧📊 Pie + Bar Chart Summary */}
// <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
//   <h2 className="text-2xl font-bold mb-6">📊 Summary</h2>

//   <div className="flex flex-col lg:flex-row gap-6 h-[400px] w-full items-center justify-center">
//     {/* Pie Chart */}
//     <div className="w-full lg:w-1/2 h-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             dataKey="value"
//             isAnimationActive
//             data={filteredSummaryData}
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {filteredSummaryData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[entry.name as keyof typeof COLORS]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>

//     {/* Bar Chart */}
//     <div className="w-full lg:w-1/2 h-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={filteredSummaryData}>
//           <XAxis dataKey="name" tick={{ fill: '#ffffff' }} />
//           <YAxis domain={[0, 'dataMax + 20'] } tick={{ fill: '#ffffff' }} />
//           <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000' }}
//           labelStyle={{ color: '#000' }}
//  />
//           <Bar
//             dataKey="value"
//             label={{
//               position: "top",
//               fill: "#fff",
//               fontSize: 14,
//               fontWeight: 600,
//             }}
//           >
//             {filteredSummaryData.map((entry, index) => (
//               <Cell
//                 key={`bar-${index}`}
//                 fill={COLORS[entry.name as keyof typeof COLORS]}
//               />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   </div>
// </div>


//           {/* 🛠 Filter Bar */}
//           <div className="flex flex-wrap gap-4 justify-center mt-8">
//             {["TRANSFER", "DISCOUNT", "DONATE", "MONITOR", "NONE"].map(type => (
//               <button
//                 key={type}
//                 onClick={() => setFilter(filter === type ? null : type)}
//                 className={`px-4 py-2 rounded-full font-semibold 
//                   transition ${
//                     filter === type
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
//                   }`}
//               >
//                 {type}
//               </button>
//             ))}
//             <button
//               onClick={() => setFilter(null)}
//               className={`px-4 py-2 rounded-full font-semibold transition ${
//                 !filter
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
//               }`}
//             >
//               Show All
//             </button>
//           </div>

//           {/* 🚀 Recommendations */}
//           <div className="mt-10">
//             <h2 className="text-2xl font-bold mb-6">
//               {filter ? `Showing: ${filter}` : "All Recommendations"}
//             </h2>
//             {loading ? (
//               <div className="text-center py-10">Loading recommendations...</div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredData.map((rec, idx) => (
//                   <RecommendationCard key={idx} rec={rec} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
