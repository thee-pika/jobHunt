"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [inputData, setinputData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Recruiter",
  });

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const form = {
        fullName: inputData.fullName,
        email: inputData.email,
        password: inputData.password,
        role: inputData.role,
      };

      const signupRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/auth/signup`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (signupRes.status === 200) {
        toast.success("Account Created Successfully!!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        toast.error(signupRes.data.message || "signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: any) => {
    setinputData((prevState) => ({
      ...prevState,
      role: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Sign Up
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg p-2 focus:outline-none border-gray-600 border-[1px] focus:ring-1 focus:ring-gray-600"
              placeholder="Enter your full name"
              value={inputData.fullName}
              onChange={(e) =>
                setinputData({ ...inputData, fullName: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full  rounded-lg p-2 focus:outline-none border-gray-600 border-[1px] focus:ring-1 focus:ring-gray-600"
              placeholder="Enter your email"
              value={inputData.email}
              onChange={(e) =>
                setinputData({ ...inputData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg p-2 focus:outline-none border-gray-600 border-[1px] focus:ring-1 focus:ring-gray-600"
              placeholder="Create a password"
              value={inputData.password}
              onChange={(e) =>
                setinputData({ ...inputData, password: e.target.value })
              }
              required
            />
          </div>

          <div>
            <RadioGroup
              defaultValue="Recruiter"
              className="flex justify-evenly m-4"
              onValueChange={handleChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Recruiter" id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="User" id="user" />
                <Label htmlFor="user">Student</Label>
              </div>
            </RadioGroup>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition"
          >
            {loading ? "creating Account" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <Link href="/auth/login">
            <button className="text-blue-500 hover:underline cursor-pointer">
              Log In
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
