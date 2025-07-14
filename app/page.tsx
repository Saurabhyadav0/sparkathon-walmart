"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInComponent from "../component/SignIn";
import { FaMicrochip } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-all duration-700 overflow-x-hidden font-sans">

      {/* Background Lights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-2xl" />
      </div>

      {/* Navbar */}
      <header className="w-full px-8 py-4 flex justify-between items-center bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-md sticky top-0 z-50 rounded-b-2xl">
        <div className="flex items-center space-x-3">
          <FaMicrochip className="text-blue-600 text-3xl animate-spin-slow" />
          <h1 className="text-2xl font-bold tracking-wide">Smart Waste Tracker</h1>
        </div>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            Dashboard
          </Link>
        </SignedIn>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 py-24 sm:py-32 space-y-10">
        <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-700 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
          Empower Your Waste Management
        </h2>

        <p className="max-w-2xl text-xl text-gray-700 dark:text-gray-300">
          Track, analyze, and optimize waste generation using intelligent AI-powered insights.
        </p>

        {/* Logged In Box */}
        <SignedIn>
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-transform duration-500 hover:scale-[1.04] hover:shadow-blue-400/40">
            <p className="text-lg mb-6">
              You are logged in. Jump into your smart dashboard now.
            </p>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Go to Dashboard
            </Link>
          </div>
        </SignedIn>

        {/* Signed Out Box */}
        <SignedOut>
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-transform duration-500 hover:rotate-1 hover:scale-[1.04] hover:shadow-blue-400/40">
            <SignInComponent />
          </div>
        </SignedOut>
      </section>

      {/* Footer */}
      {/* <footer className="relative z-10 text-center text-sm text-gray-500 dark:text-gray-400 py-6">
        © 2025 Smart Waste Tracker — Empowering a Cleaner Future ♻️
      </footer> */}
    </main>
  );
}



// "use client";

// import Link from "next/link";
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import SignInComponent from "../component/SignIn";
// import { FaMicrochip } from "react-icons/fa";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-700">
      
//       <header className="w-full px-8 py-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
//         <div className="flex items-center space-x-3">
//           <FaMicrochip className="text-blue-600 text-3xl animate-pulse" />
//           <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-gray-100">
//             Smart Waste Tracker
//           </h1>
//         </div>
//         <SignedIn>
//           <Link
//             href="/dashboard"
//             className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
//           >
//             Dashboard
//           </Link>
//         </SignedIn>
//       </header>

     
//       <section className="flex flex-col justify-center items-center text-center px-6 py-20 space-y-10 animate-fade-in">
//         <h2 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-blue-700 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
//           Empower Your Waste Management
//         </h2>

//         <p className="max-w-3xl text-xl text-gray-700 dark:text-gray-300">
//           Track, analyze, and optimize waste generation with intelligent insights powered by AI.
//         </p>

        
//         <SignedIn>
//           <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
//             <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
//               You are logged in. Your smart dashboard is just a click away.
//             </p>
//             <Link
//               href="/dashboard"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               Go to Dashboard
//             </Link>
//           </div>
//         </SignedIn>

        
//         <SignedOut>
//           <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:rotate-[1deg] hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
//             <SignInComponent />
//           </div>
//         </SignedOut>
//       </section>
//     </main>
//   );
// }



// "use client"

// import Link from "next/link"
// import { SignedIn, SignedOut } from '@clerk/nextjs'
// import SignInComponent from '../component/SignIn'

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 
//       bg-gradient-to-br from-gray-100 via-gray-50 to-white 
//       dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
//       text-gray-900 dark:text-gray-100 transition-colors duration-700">
      
//       <div className="w-full max-w-2xl text-center space-y-10">
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight 
//           animate-fadeInSlow">
//           Welcome to <span className="text-blue-600 dark:text-blue-400">
//             Smart Waste Tracker
//           </span>
//         </h1>

//         <SignedIn>
//           <div className="group bg-white dark:bg-gray-800/60 p-8 rounded-xl shadow-lg 
//             border border-gray-200 dark:border-gray-700 space-y-6 transition-all 
//             duration-700 ease-in-out transform hover:scale-105 hover:-rotate-1 
//             hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)]">
            
//             <p className="text-lg">
//               You are logged in. Click below to access your dashboard.
//             </p>

//             <Link 
//               href="/dashboard"
//               className="inline-block bg-blue-600 hover:bg-blue-700 active:scale-95 
//                 transition-all duration-500 text-white px-8 py-3 rounded-lg 
//                 font-semibold shadow-md group-hover:shadow-blue-500/50"
//             >
//               Go to Dashboard
//             </Link>
//           </div>
//         </SignedIn>

//         <SignedOut>
//           <div className="group bg-white dark:bg-gray-800/60 p-8 rounded-xl shadow-lg 
//             border border-gray-200 dark:border-gray-700 space-y-6 transition-all 
//             duration-700 ease-in-out transform hover:scale-105 hover:rotate-1 
//             hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)]">
            
//             <SignInComponent />
//           </div>
//         </SignedOut>
//       </div>
//     </div>
//   )
// }
