"use client";

import { useState } from "react";

import { Search, MapPin } from "lucide-react";
import FeaturedJobs from "./FeaturedJobs";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your
              <span className="text-yellow-400"> Dream Job</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover thousands of opportunities from top companies worldwide.
              Your next career adventure starts here.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 w-full text-gray-900 border-[#E5E5E5] border-[1px] rounded-md "
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 text-gray-900 w-full border-[#E5E5E5] border-[1px] rounded-md"
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Search Jobs
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Popular searches:
                <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                  Software Engineer
                </span>
                ,
                <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                  Product Manager
                </span>
                ,
                <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                  Data Scientist
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                50K+
              </div>
              <div className="text-blue-100 mt-2">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                10K+
              </div>
              <div className="text-blue-100 mt-2">Companies</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                500K+
              </div>
              <div className="text-blue-100 mt-2">Job Seekers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                95%
              </div>
              <div className="text-blue-100 mt-2">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
      <FeaturedJobs searchTerm={searchTerm} location={location} />
    </>
  );
};

export default Hero;
