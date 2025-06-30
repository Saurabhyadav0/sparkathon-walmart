"use client"

import Link from "next/link"
import { SignedIn, SignedOut } from '@clerk/nextjs'
import SignInComponent from '../component/SignIn'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 
      bg-gradient-to-br from-gray-100 via-gray-50 to-white 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      text-gray-900 dark:text-gray-100 transition-colors duration-700">
      
      <div className="w-full max-w-2xl text-center space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight 
          animate-fadeInSlow">
          Welcome to <span className="text-blue-600 dark:text-blue-400">
            Smart Waste Tracker
          </span>
        </h1>

        <SignedIn>
          <div className="group bg-white dark:bg-gray-800/60 p-8 rounded-xl shadow-lg 
            border border-gray-200 dark:border-gray-700 space-y-6 transition-all 
            duration-700 ease-in-out transform hover:scale-105 hover:-rotate-1 
            hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)]">
            
            <p className="text-lg">
              You are logged in. Click below to access your dashboard.
            </p>

            <Link 
              href="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 active:scale-95 
                transition-all duration-500 text-white px-8 py-3 rounded-lg 
                font-semibold shadow-md group-hover:shadow-blue-500/50"
            >
              Go to Dashboard
            </Link>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="group bg-white dark:bg-gray-800/60 p-8 rounded-xl shadow-lg 
            border border-gray-200 dark:border-gray-700 space-y-6 transition-all 
            duration-700 ease-in-out transform hover:scale-105 hover:rotate-1 
            hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)]">
            
            <SignInComponent />
          </div>
        </SignedOut>
      </div>
    </div>
  )
}
