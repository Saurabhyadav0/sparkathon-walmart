"use client";

import { useState, useMemo } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function RecommendationCard({ rec }: { rec: any }) {
  const recommendation = rec.Recommendation?.toUpperCase();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Memoize the badge styles (good if many renders)
  const badgeStyle = useMemo(() => ({
    TRANSFER: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200",
    DONATE: "bg-purple-100 text-purple-800 dark:bg-purple-600 dark:text-purple-200",
    DISCOUNT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-200",
    MONITOR: "bg-pink-100 text-pink-800 dark:bg-pink-600 dark:text-pink-200",
    NONE: "bg-sky-100 text-sky-800 dark:bg-sky-600 dark:text-sky-200",
  }), []);

  const handleAction = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border 
      border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transform transition-all 
      duration-300 hover:-translate-y-1 hover:scale-105"
    >
      <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {rec.ItemName}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        🏬 Store: {rec.StoreID} &nbsp;|&nbsp; ⏳ Days until expiry:{" "}
        <span className="font-medium">{rec.DaysUntilExpiry}</span>
      </p>

      <div className="mt-2">
        <span
          className={`inline-block px-4 py-1 rounded-full text-sm font-medium tracking-wide 
          shadow-md transition-transform duration-200 ${
            badgeStyle[recommendation as keyof typeof badgeStyle] || badgeStyle["NONE"]
          }`}
        >
          {recommendation}
        </span>
      </div>

      {rec.ActionQty && rec.ActionQty > 0 && (
        <div className="mt-4 text-sm space-y-1 text-gray-800 dark:text-gray-200">
          <p>
            Suggested Quantity:{" "}
            <span className="font-bold text-blue-600 dark:text-blue-300">
              {rec.ActionQty}
            </span>
          </p>
          <p>
            Action %:{" "}
            <span className="font-bold text-blue-600 dark:text-blue-300">
              {rec.ActionPct}
            </span>
          </p>
        </div>
      )}

      {recommendation === "TRANSFER" && (
        <p className="mt-4 text-sm text-gray-800 dark:text-gray-200">
          Transfer Qty:{" "}
          <span className="font-bold text-green-600 dark:text-green-300">
            {rec.TransferQty}
          </span>
        </p>
      )}

      <div className="mt-6 flex flex-col items-start space-y-2">
        {!loading && !done && (
          <button
            onClick={handleAction}
            className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {recommendation === "DONATE" ? "Donate Now" :
             recommendation === "TRANSFER" ? "Transfer Now" :
             recommendation === "DISCOUNT" ? "Apply Discount" :
             recommendation === "MONITOR" ? "Monitor Item" :
             "Proceed"}
          </button>
        )}

        {loading && (
          <div className="flex items-center space-x-2">
            <ClipLoader color="#6366F1" size={28} />
            <span className="text-gray-800 dark:text-gray-100 text-sm">
              Processing...
            </span>
          </div>
        )}

        {done && (
          <div className="text-green-600 dark:text-green-300 text-sm font-semibold">
            ✅ {recommendation === "DONATE" ? "Donation completed!" :
                recommendation === "TRANSFER" ? "Transfer done!" :
                recommendation === "DISCOUNT" ? "Discount applied!" :
                "Action completed!"}
          </div>
        )}
      </div>
    </div>
  );
}
