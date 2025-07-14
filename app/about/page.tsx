"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-700">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent drop-shadow-md">
            About Smart Waste Tracker
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Smart Waste Tracker leverages AI to streamline inventory decisions and reduce waste across supply chains.
          </p>
        </div>

        {/* Section Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">🚀 What We Do</h2>
          <p>
            Smart Waste Tracker is an intelligent platform designed to help businesses and organizations manage their inventory efficiently and reduce unnecessary waste.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            The system analyzes inventory data and uses machine learning to suggest what to do with each item — transfer, donate, discount, or monitor.
          </p>
        </div>

        {/* Inventory Optimization */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">📦 Inventory Optimization</h2>
          <p>
            Overstocked or slow-moving inventory can hurt businesses. Smart Waste Tracker helps you make proactive decisions using real-time data, helping reduce waste and maximize efficiency.
          </p>
        </div>

        {/* ML Model */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">🧠 How Our ML Model Works</h2>
          <p>
            The system classifies each item using trained ML models into one of four categories:
          </p>
          <ul className="list-disc list-inside pl-4 text-gray-700 dark:text-gray-300">
            <li><strong>Transfer:</strong> Move to a higher-demand location.</li>
            <li><strong>Donate:</strong> For items near expiry or with no demand.</li>
            <li><strong>Discount:</strong> Apply markdowns to sell fast.</li>
            <li><strong>Monitor:</strong> Keep tracking until decision-ready.</li>
          </ul>
        </div>

        {/* Why it matters */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">🌍 Why This Matters</h2>
          <p>
            Smarter decisions = less waste + better margins. Our system reduces manual guesswork, helps sustainability, and empowers retail teams with actionable insights.
          </p>
          <p>
            Whether you run a warehouse, retail store, or donation center — our tools ensure you get the most value from every inventory item.
          </p>
        </div>
      </div>
    </main>
  );
}




// export default function AboutPage() {
//   return (
//     <div className="min-h-screen pt-24 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <div className="max-w-4xl mx-auto space-y-8">
//         <h1 className="text-4xl font-bold">About Smart Waste Tracker</h1>

//         <p className="text-lg">
//           Smart Waste Tracker is an intelligent platform designed to help businesses and organizations manage their product inventory efficiently and reduce unnecessary waste.
//         </p>

//         <p className="text-md text-gray-700 dark:text-gray-300">
//           Our system analyzes inventory data and uses a machine learning model to recommend the best course of action for each item — whether to transfer it to another location, donate it, offer a discount, or continue monitoring it.
//         </p>

//         <h2 className="text-2xl font-semibold">Inventory Optimization</h2>
//         <p className="text-md text-gray-700 dark:text-gray-300">
//           Many organizations face challenges with overstocked, slow-moving, or expiring products. Smart Waste Tracker helps you stay ahead by organizing your inventory based on real-time insights. It minimizes loss and ensures that items are either sold, relocated, or donated at the right time.
//         </p>

//         <h2 className="text-2xl font-semibold">How the ML Model Works</h2>
//         <p className="text-md text-gray-700 dark:text-gray-300">
//           The core of the system is a machine learning model trained on historical inventory and sales data. It classifies each product into one of four categories:
//         </p>
//         <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
//           <li><strong>Transfer</strong> — Move inventory to a location where it&apos;s more likely to sell.</li>
//           <li><strong>Donate</strong> — Suggest donation for items nearing expiration or with no demand.</li>
//           <li><strong>Discount</strong> — Apply discounts to accelerate sales of stagnant stock.</li>
//           <li><strong>Monitor</strong> — Keep tracking the item until enough data is available to act.</li>
//         </ul>

//         <h2 className="text-2xl font-semibold">Why This Matters</h2>
//         <p className="text-md text-gray-700 dark:text-gray-300">
//           By making data-driven decisions, Smart Waste Tracker reduces manual guesswork, cuts down on waste, and contributes to sustainable retail and supply chain practices. It empowers businesses to make smarter, faster, and greener inventory decisions.
//         </p>

//         <p className="text-md text-gray-700 dark:text-gray-300">
//           Whether you&apos;re managing a retail store, a warehouse, or a donation center, Smart Waste Tracker helps you get the most value out of every item in your inventory.
//         </p>
//       </div>
//     </div>
//   );
// }
