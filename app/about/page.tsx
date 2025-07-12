export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">About Smart Waste Tracker</h1>

        <p className="text-lg">
          Smart Waste Tracker is an intelligent platform designed to help businesses and organizations manage their product inventory efficiently and reduce unnecessary waste.
        </p>

        <p className="text-md text-gray-700 dark:text-gray-300">
          Our system analyzes inventory data and uses a machine learning model to recommend the best course of action for each item — whether to transfer it to another location, donate it, offer a discount, or continue monitoring it.
        </p>

        <h2 className="text-2xl font-semibold">Inventory Optimization</h2>
        <p className="text-md text-gray-700 dark:text-gray-300">
          Many organizations face challenges with overstocked, slow-moving, or expiring products. Smart Waste Tracker helps you stay ahead by organizing your inventory based on real-time insights. It minimizes loss and ensures that items are either sold, relocated, or donated at the right time.
        </p>

        <h2 className="text-2xl font-semibold">How the ML Model Works</h2>
        <p className="text-md text-gray-700 dark:text-gray-300">
          The core of the system is a machine learning model trained on historical inventory and sales data. It classifies each product into one of four categories:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4">
          <li><strong>Transfer</strong> — Move inventory to a location where it&apos;s more likely to sell.</li>
          <li><strong>Donate</strong> — Suggest donation for items nearing expiration or with no demand.</li>
          <li><strong>Discount</strong> — Apply discounts to accelerate sales of stagnant stock.</li>
          <li><strong>Monitor</strong> — Keep tracking the item until enough data is available to act.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Why This Matters</h2>
        <p className="text-md text-gray-700 dark:text-gray-300">
          By making data-driven decisions, Smart Waste Tracker reduces manual guesswork, cuts down on waste, and contributes to sustainable retail and supply chain practices. It empowers businesses to make smarter, faster, and greener inventory decisions.
        </p>

        <p className="text-md text-gray-700 dark:text-gray-300">
          Whether you&apos;re managing a retail store, a warehouse, or a donation center, Smart Waste Tracker helps you get the most value out of every item in your inventory.
        </p>
      </div>
    </div>
  );
}
