"use client";

export default function RecommendationCard({ rec }: { rec: any }) {
  const recommendation = rec.Recommendation?.toUpperCase();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
      <h3 className="text-xl font-bold mb-2">{rec.ItemName}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Store: {rec.StoreID} | Days until expiry: {rec.DaysUntilExpiry}
      </p>

      <div className="mt-2">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            recommendation === "TRANSFER"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : recommendation === "DONATE"
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              : recommendation === "DISCOUNT"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
          }`}
        >
          {recommendation}
        </span>
      </div>

      {rec.ActionQty && rec.ActionQty > 0 && (
        <div className="mt-4 text-sm">
          <p>
            Suggested Quantity: <span className="font-bold">{rec.ActionQty}</span>
          </p>
          <p>
            Action %: <span className="font-bold">{rec.ActionPct}</span>
          </p>
        </div>
      )}

      {recommendation === "TRANSFER" && (
        <p className="mt-4 text-sm">
          Transfer Qty: <span className="font-bold">{rec.TransferQty}</span>
        </p>
      )}
    </div>
  );
}
