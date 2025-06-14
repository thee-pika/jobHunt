"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import JobT from "@/app/types/interfaces/job";
import useAuth from "@/app/hooks/useAuth";
import JobService from "@/app/services/job-service";
import ApplicationService from "@/app/services/application";
import { toast, Toaster } from "sonner";
import SkeletonCard from "@/app/components/loader/CardLoader";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<JobT | null>(null);
  const [loading, setLoading] = useState(false);
  const { accessToken, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getJobDetails();
  }, [id]);

  const getJobDetails = async () => {
    try {
      if (!accessToken) {
        router.push("/auth/login");
      }
      if (accessToken && id) {
        const res = await JobService.getById(accessToken, id as string);

        setJob(res.data.jobOpening);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error Occured!!");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job: JobT) => {
    try {
      setLoading(true);

      if (!user || !accessToken) {
        return;
      }

      if (!user.resume) {
        toast("Plzz upload resume before applying ...");

        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }

      const payload = {
        jobId: job.id,
        recruterId: job.userId,
        role: job.title,
        company: job.company,
        resume: user.resume,
      };

      const res = await ApplicationService.create(accessToken, payload);
      if (res.status === 200) {
        toast.success("Job Applied Successfully!!");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }

      console.log("res", res);
    } catch (error) {
      toast.error("Some error Occured!!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && job ? (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
          <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-6 mt-10">
            <div className="flex items-center space-x-4">
              <img
                src={job.logo_url}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-gray-500 text-sm">{job.company}</p>
                <p className="text-gray-600 text-sm">📍 {job.location}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p>
                <span className="font-semibold">Type:</span> {job.type}
              </p>
              <p>
                <span className="font-semibold">Salary:</span> ₹
                {job.salary.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Skills Required:</span>{" "}
                {job.skills}
              </p>
              {job.deadline && (
                <p>
                  <span className="font-semibold text-red-500">Deadline:</span>{" "}
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Job Description</h2>
              <p className="text-gray-700 mt-2">
                We are looking for a skilled frontend developer with experience
                in React and TypeScript. Your role will involve building and
                maintaining user-friendly web interfaces.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={() => handleApply(job)}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[35rem]">
          <SkeletonCard />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default JobDetails;
