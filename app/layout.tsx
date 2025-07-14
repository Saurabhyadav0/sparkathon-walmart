// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ThemeProvider } from "next-themes";
// import { Providers } from "../providers/Providers";
// import Navbar from "@/component/Navbar";
// import Footer from "@/component/footer"; // ⬅️ Consistent casing

// export const metadata = {
//   title: "Smart Waste Tracker",
//   description: "Dashboard to monitor spoilage and reduce waste",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head />
//       <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen antialiased">
//         <ClerkProvider>
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//             <Providers>
//               {/* Global Navbar */}
//               <Navbar />

//               {/* Page content */}
//               <main className="flex-grow">{children}</main>

//               {/* Global Footer */}
//               <Footer />
//             </Providers>
//           </ThemeProvider>
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }



import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Providers } from "../providers/Providers";
import Footer from "../component/footer"; //
import Navbar from "@/component/Navbar";

export const metadata = {
  title: "Smart Waste Tracker",
  description: "Dashboard to monitor spoilage and reduce waste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
        <ClerkProvider>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar /> {/* ✅ Add Navbar here */}
              <main className="flex-grow">{children}</main> {/* ✅ Wrap in <main> for spacing */}
              <Footer /> {/* ✅ Add footer here */}
            </ThemeProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
