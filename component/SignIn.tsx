"use client";

import { useRouter } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";

export default function SignInComponent() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl px-10 py-12 w-full max-w-md transform transition-all duration-500 hover:scale-[1.03] hover:shadow-blue-500/30">
        <div className="flex items-center justify-center mb-6">
          <FaSignInAlt className="text-blue-600 text-4xl animate-bounce-slow" />
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
          Welcome to <span className="text-blue-600">Smart Waste Tracker</span>
        </h2>

        <p className="text-base text-gray-600 dark:text-gray-300 text-center mb-8">
          Sign in to unlock your personalized dashboard and optimize your inventory.
        </p>

        <button
          onClick={() => router.push("/sign-in")}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}



// "use client"

// import { useRouter } from 'next/navigation'

// export default function SignInComponent() {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
//       <h2 className="text-3xl font-bold">Welcome to Smart Waste Tracker</h2>
//       <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
//         Please sign in to access your personalized dashboard and start managing inventory efficiently.
//       </p>
//       <button
//         onClick={() => router.push('/sign-in')}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md 
//           transition-all duration-300 animate-pulse 
//           hover:shadow-xl hover:scale-105 active:scale-95"
//       >
//         Sign In
//       </button>
//     </div>
//   )
// }

// "use client"

// import { SignInButton } from '@clerk/nextjs'

// export default function SignInComponent() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
//       <h2 className="text-3xl font-bold">Welcome to Smart Waste Tracker</h2>
//       <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
//         Please sign in to access your personalized dashboard and start managing inventory efficiently.
//       </p>
//       <SignInButton>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md 
//           transition-all duration-300 animate-pulse 
//           hover:shadow-xl hover:scale-105 active:scale-95">
//           Sign In
//         </button>
//       </SignInButton>
//     </div>
//   )
// }
