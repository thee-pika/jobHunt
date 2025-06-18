"use client";
import useAuth from "@/app/hooks/useAuth";
import AuthService from "@/app/services/auth-service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const [inputData, setinputData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);


      const loginRes = await AuthService.login({
        email: inputData.email,
        password: inputData.password,
      });

      if (loginRes.status === 200) {
        const { access_Token, refresh_Token, user } = loginRes.data.tokens;
    
        await login(access_Token, refresh_Token, user);

        router.push("/");
      } else {
        alert(loginRes.data.message || "Login failed");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Login
        </h1>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              onChange={(e) =>
                setinputData({ ...inputData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            className="w-full bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in " : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?
          <Link href="/auth/signup">
            <button className="text-blue-500 hover:underline">Sign up</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
