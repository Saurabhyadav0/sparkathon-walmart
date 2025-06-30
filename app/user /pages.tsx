import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import Navbar from "../../component/Navbar";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return <RedirectToSignIn />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100 flex flex-col px-4">
        
        <div className="w-full max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold">Hello 👋</h1>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow transition-colors duration-300">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Welcome to your Smart Waste Tracker dashboard.
            </p>

           
          </div>

          <div className="bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg shadow">
          
       <Link href="user"><button className="text-lg text-gray-700 dark:text-gray-300" > user</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
