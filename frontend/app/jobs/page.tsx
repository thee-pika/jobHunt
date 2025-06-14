"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import JobService from "../services/job-service";
import JobT from "../types/interfaces/job";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/jobCard";
import Link from "next/link";
import SkeletonCard from "../components/loader/CardLoader";

const Jobs = () => {
  const { accessToken } = useAuth();
  const [jobs, setJobs] = useState<JobT[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobT[]>([]);
  const [loading, setloading] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    salary: 0,
    type: "",
  });

  const getJobs = async () => {
    try {
      setloading(true);
      if (accessToken) {
        const jobResponse = await JobService.get(accessToken);

        setJobs(jobResponse.data.jobOpenings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      return (
        (!filters.title ||
          job.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (!filters.location ||
          job.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (!filters.salary || job.salary >= filters.salary) &&
        (!filters.type || job.type === filters.type)
      );
    });
    setFilteredJobs(filtered);
  }, [filters, jobs]);

  return (
    <div className="flex min-h-screen">
      <Sidebar filters={filters} setFilters={setFilters} />
      <main className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
        {!loading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id}>
                    <Link href={`jobs/${job.id}`}>
                      <JobCard key={job.id} job={job} />
                    </Link>
                  </div>
                ))
              ) : (
                <p>No jobs match the current filters.</p>
              )}
            </div>
          </>
        ) : (
          <>
            {[...Array(2)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex justify-evenly ${rowIndex > 0 ? "mt-4" : ""}`}
              >
                {[...Array(3)].map((_, cardIndex) => (
                  <SkeletonCard key={cardIndex} />
                ))}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default Jobs;
