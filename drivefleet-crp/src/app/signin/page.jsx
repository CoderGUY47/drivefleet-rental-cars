"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Exam purpose: default admin login logic active for 1 month
    if (isPromoActive && user.email === "admin@gmail.com" && user.password === "admin") {
      // 1. Try to sign in first
      const signInRes = await authClient.signIn.email({
        email: "admin@gmail.com",
        password: "admin",
      });

      if (signInRes.data) {
        toast.success("Account Login successfully");
        router.push("/");
        return;
      }

      // 2. If it failed (e.g. user does not exist), register the admin user automatically
      const signUpRes = await authClient.signUp.email({
        email: "admin@gmail.com",
        password: "admin",
        name: "Admin",
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin",
      });

      if (signUpRes.data) {
        // Sign in immediately after signup
        const retryRes = await authClient.signIn.email({
          email: "admin@gmail.com",
          password: "admin",
        });
        if (retryRes.data) {
          toast.success("Account Login successfully");
          router.push("/");
          return;
        }
      }

      // If both fail, show error
      if (signUpRes.error) {
        toast.error(signUpRes.error.message || "Failed to initialize admin session");
        return;
      }
    }

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Account Login successfully");
      router.push("/");
    } else if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const currentDate = new Date();
  const expirationDate = new Date("2026-06-21T23:59:59");
  const isPromoActive = currentDate <= expirationDate;

  return (
    <div className="w-full min-h-[90vh] flex bg-white">
      {/* left hero image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden group">
        <Image
          src="/assets/login.jpg"
          width={1000}
          height={700}
          alt="Luxury Car Interior"
          className="w-full h-full object-cover brightness-60 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute bottom-70 left-10 text-white">
          <h2 className="text-7xl font-bold uppercase leading-tight">
            Welcome <span className="text-orange-400">Back.</span>
          </h2>
          <p className="text-gray-300 mt-3 text-xl max-w-xl">
            Sign in to manage your reservations and explore the world's most
            elite vehicle fleet.
          </p>
        </div>
      </div>

      {/* right form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[420px] space-y-6">
          {/* logo */}
          <Link
            href="/"
            className="flex items-center gap-2 mb-4 justify-center"
          >
            <span className="material-symbols-outlined text-3xl text-orange-500">
              directions_car
            </span>
            <span className="text-2xl font-bold uppercase tracking-wide text-gray-900">
              Drive<span className="text-orange-500">Fleet</span>
            </span>
          </Link>

          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest block mb-1 text-orange-500">
              EXISTING MEMBER
            </span>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Sign In
            </h1>
          </div>

          <div className="bg-white w-full p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-gray-100 rounded-none">
            <Form onSubmit={handleSignIn} className="flex flex-col gap-4">
              {isPromoActive && (
                <div className="bg-orange-50 border border-orange-200/60 p-4 text-left rounded-none mb-2">
                  <div className="flex gap-2.5 items-start">
                    <span className="material-symbols-outlined text-orange-500 text-lg mt-0.5">
                      vpn_key
                    </span>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-orange-800 mb-1">
                        Exam Purpose Active
                      </h4>
                      <p className="text-xs text-orange-700 leading-relaxed">
                        Sign in instantly by entering <strong>admin</strong> for both Email and Password fields.
                      </p>
                      <p className="text-[10px] text-orange-600/70 mt-1 italic">
                        *This default bypass logic will automatically disable on June 21, 2026.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* email address */}
              <TextField
                name="email"
                type="email"
                isRequired
                className="w-full"
              >
                <Label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Email Address
                </Label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400 text-lg" />
                  </div>
                  <Input
                    name="email"
                    value="admin@gmail.com"
                    suppressHydrationWarning
                    className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:bg-white rounded-none py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <FieldError className="text-red-500 text-xs mt-1 block" />
              </TextField>

              {/* password */}
              <TextField
                name="password"
                type="password"
                isRequired
                className="w-full"
              >
                <Label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Password
                </Label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400 text-lg" />
                  </div>
                  <Input
                    name="password"
                    value="admin"
                    suppressHydrationWarning
                    className="w-full bg-[#f8f9fa] border border-gray-200 focus:border-orange-500 focus:bg-white rounded-none py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <FieldError className="text-red-500 text-xs mt-1 block" />
              </TextField>

              {/* submit button */}
              <Button
                type="submit"
                className="w-full hover:opacity-90 text-gray-900 font-bold uppercase tracking-widest py-3 rounded-none transition-colors mt-2 text-sm bg-orange-500"
              >
                Sign In
              </Button>

              {/* divider */}
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Or sign in with
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* google button */}
              <Button
                onClick={handleGoogleSignIn}
                type="button"
                variant="ghost"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-sm py-3 rounded-none transition-colors"
              >
                <FcGoogle className="text-xl" />
                SIGN IN WITH GOOGLE
              </Button>
            </Form>
          </div>

          {/* footer */}
          <div className="text-center text-sm text-gray-500 pt-2">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold hover:underline text-orange-500"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
