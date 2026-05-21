"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

/* client component for signing out */
export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-red-600 border-2 border-red-200 hover:bg-red-50 transition-colors"
    >
      Sign Out
    </button>
  );
}
