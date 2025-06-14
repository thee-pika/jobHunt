"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkeletonL from "../components/loader/Loader";
import useAuth from "../hooks/useAuth";
import JobService from "../services/job-service";
import JobT from "../types/interfaces/job";
import { toast, Toaster } from "sonner";

const PostedJobs = () => {
  const [postedJobs, setPostedJobs] = useState<JobT[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { accessToken } = useAuth();

  const jobDetails = async () => {
    try {
      setLoading(true);
      if (accessToken) {
        const res = await JobService.getMyJObs(accessToken);

        setPostedJobs(res.data.jobOpenings);
      }
    } catch (error) {
      console.log(error);
      toast.error("some error Occured!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    jobDetails();
  }, []);

  const handleDelete = async (jobId: string) => {
    try {
      setLoading(true);
      if (accessToken) {
        const res = await JobService.delete(accessToken, jobId);

        if (res.status === 200) {
          toast.success("Job Deleted Successfully!!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("some error Occured!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="p-4">
          <div className="flx justify-between">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold mb-4">All Companies</h1>
              <Link href="/jobPosting">
                <button className="mb-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
                  Post new JOb
                </button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Logo
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Salary
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {postedJobs.length > 0 ? (
                  postedJobs.map((job: JobT) => (
                    <tr
                      key={job.id}
                      className="border-t hover:bg-gray-100 transition"
                    >
                      <td className="p-4">
                        <Image
                          src={job.logo_url}
                          alt={`${job.title} logo`}
                          width={100}
                          height={100}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </td>
                      <td className="p-4 truncate">{job.company}</td>
                      <td className="p-4">{job.title}</td>
                      <td className="p-4">{job.location}</td>
                      <td className="p-4">{job.salary} LPA</td>
                      <td className="p-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="text-gray-500 hover:text-gray-800">
                              <EllipsisVertical />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/jobPosting/edit/${job.id}`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(job.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/jobs/applications/${job.id}`)
                              }
                            >
                              Applications
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-4 text-center text-gray-500 italic"
                    >
                      No Jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className=" flex flex-col items-center mt-8 mb-8">
            <SkeletonL />
            {[...Array(6)].map((__, i) => (
              <div className="m-8" key={i}>
                <SkeletonL />
              </div>
            ))}
          </div>
        </>
      )}
      <Toaster />
    </>
  );
};

export default PostedJobs;
