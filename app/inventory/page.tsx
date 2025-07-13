"use client"

import { useState, useEffect } from 'react'

type Product = {
  id: number;
  ItemName: string;
  Brand: string;
  Category: string;
  StockQty: number;
  ArrivalDate: string;
  ExpiryDate: string;
  StoreLocation: string;
};

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`/api/products?page=${page}&limit=15`)
        if (!res.ok) throw new Error("Failed to fetch data")
        const data = await res.json()
        setProducts(data.data)
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }

    loadProducts()
  }, [page])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Inventory
      </h1>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Item Name</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Stock Qty</th>
              <th className="px-4 py-3">Arrival</th>
              <th className="px-4 py-3">Expiry</th>
              <th className="px-4 py-3">Store</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr 
                key={idx} 
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{p.ItemName}</td>
                <td className="px-4 py-2">{p.Brand}</td>
                <td className="px-4 py-2">{p.Category}</td>
                <td className="px-4 py-2">{p.StockQty}</td>
                <td className="px-4 py-2">{new Date(p.ArrivalDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(p.ExpiryDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{p.StoreLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-800 dark:text-gray-100">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

