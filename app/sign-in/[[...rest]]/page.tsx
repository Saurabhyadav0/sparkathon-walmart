'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/signin-bg.png')" }}
    >
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
}