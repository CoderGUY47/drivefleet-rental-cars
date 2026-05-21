"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const password = user.password || "";

    // password criteria checks
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      toast.success("Account created successfully. Please sign in.");
      router.push("/signin");
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

  return (
    <div className="w-full min-h-screen flex bg-white">
      {/* left aesthetic hero display with image background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden group">
        <Image
          src="/assets/steven-binotto-o6yH_yAc2Ws-unsplash.jpg"
          width={1000}
          height={1000}
          alt="Luxury Car Interior"
          className="w-full h-screen object-cover brightness-60 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute bottom-70 left-10 text-white">
          <h2 className="text-7xl font-bold uppercase leading-tight">
            Join the <span className="text-orange-500">Elite.</span>
          </h2>
          <p className="text-gray-300 mt-3 text-xl max-w-xl">
            Create your DriveFleet account and get access to our exclusive fleet
            of premium vehicles.
          </p>
        </div>
      </div>

      {/* right authentic form display layout */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center mt-20 p-6">
        <div className="w-full max-w-[420px] shadow-xl space-y-4">
          <div className="bg-white w-full p-4 shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100 rounded-none">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">
                Fill in the details below to get started
              </p>
            </div>
            <Form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <TextField name="name" type="text" isRequired className="w-full">
                <Label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Full Name
                </Label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400 text-lg" />
                  </div>
                  <Input
                    name="name"
                    suppressHydrationWarning
                    className="w-full bg-[#f8f9fa] border border-gray-200 focus:border-orange-500 focus:bg-white rounded-none py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <FieldError className="text-red-500 text-xs mt-1 block" />
              </TextField>

              <TextField name="image" type="url" className="w-full">
                <Label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Profile Image URL
                </Label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiImage className="text-gray-400 text-lg" />
                  </div>
                  <Input
                    name="image"
                    suppressHydrationWarning
                    className="w-full bg-[#f8f9fa] border border-gray-200 focus:border-orange-500 focus:bg-white rounded-none py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                    placeholder="Enter profile image URL"
                  />
                </div>
                <FieldError className="text-red-500 text-xs mt-1 block" />
              </TextField>

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
                    suppressHydrationWarning
                    className="w-full bg-[#f8f9fa] border border-gray-200 focus:border-orange-500 focus:bg-white rounded-none py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
                <FieldError className="text-red-500 text-xs mt-1 block" />
              </TextField>
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
                    suppressHydrationWarning
                    className="w-full bg-[#f8f9fa] border border-gray-200 focus:border-orange-500 focus:bg-white rounded-none py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{passwordError}</p>
                )}
                <FieldError className="text-red-500 text-xs mt-1 block" />
              </TextField>
              <Button
                type="submit"
                className="w-full hover:opacity-90 text-white font-bold uppercase tracking-widest py-3 rounded-none transition-colors mt-2 text-sm bg-orange-500"
              >
                Create Account
              </Button>
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Or sign up with
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                type="button"
                variant="ghost"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 text-gray-800 font-bold text-sm py-3 rounded-none transition-colors"
              >
                <FcGoogle className="text-xl" />
                SIGN UP WITH GOOGLE
              </Button>
            </Form>
            <div className="flex justify-center items-center gap-2 mt-2">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
              </p>
            <Link
              href="/signin"
              className="font-semibold hover:underline text-orange-500 text-center block"
            >
              Sign in here
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
