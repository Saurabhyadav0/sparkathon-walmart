"use client"

import { SignInButton } from '@clerk/nextjs'

export default function SignInComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
      <h2 className="text-3xl font-bold">Welcome to Smart Waste Tracker</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
        Please sign in to access your personalized dashboard and start managing inventory efficiently.
      </p>
      <SignInButton>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md 
          transition-all duration-300 animate-pulse 
          hover:shadow-xl hover:scale-105 active:scale-95">
          Sign In
        </button>
      </SignInButton>
    </div>
  )
}
