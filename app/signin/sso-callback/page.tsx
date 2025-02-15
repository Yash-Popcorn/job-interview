'use client';
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function SSOCallback() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthenticateWithRedirectCallback />
    </div>
  );
} 