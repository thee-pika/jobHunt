"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    toast.success("logput successfully!!");
    await logout();
    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
  };

  const getInitial = (email: string) => email?.charAt(0).toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className=" p-2 rounded-lg">
              <Image
                src="/assets/job-search.png"
                alt="job-search_logo"
                width={50}
                height={50}
              />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Job
              <span className="text-[#EC2E3A]">Hunt</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {user?.role === "User" && (
              <>
                <Link
                  href="/jobs"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Find Jobs
                </Link>
              </>
            )}
            {user?.role === "Recruiter" && (
              <>
                <Link
                  href="/company"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Companies
                </Link>
                <Link
                  href="/postedJobs"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Post a Job
                </Link>
              </>
            )}
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                    {getInitial(user?.email || "U")}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button className="justify-start mr-4 bg-gray-50 hover:bg-gray-200 text-black cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="justify-start bg-[#EC2E3A] hover:bg-[#EC2E3A] cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <Button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="block md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {user?.role === "User" && (
                <>
                  <Link
                    href="/jobs"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Find Jobs
                  </Link>
                </>
              )}
              {user?.role === "Recruiter" && (
                <>
                  <Link
                    href="/company"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Companies
                  </Link>
                  <Link
                    href="/postedJobs"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Post a Job
                  </Link>
                </>
              )}

              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors bg-gray-300 px-2 py-2"
              >
                About
              </Link>

              <div className="flex md:hidden items-center space-x-4">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                        {getInitial(user?.email || "U")}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => router.push("/profile")}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <div className="flex flex-col w-full">
                      <Link
                        href="/auth/login"
                        className="justify-start bg-gray-300 p-2 hover:bg-gray-200 text-black cursor-pointer"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="justify-start bg-[#EC2E3A] text-white p-2 mt-4  hover:bg-[#EC2E3A] cursor-pointer"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
