"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Clock, IndianRupee, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import JobService from "../services/job-service";
import JobT from "../types/interfaces/job";
import { formatDistanceToNow, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "./loader/CardLoader";
import { toast, Toaster } from "sonner";

const FeaturedJobs = ({
  searchTerm,
  location,
}: {
  searchTerm: string;
  location: string;
}) => {
  const [jobs, setJobs] = useState<JobT[]>([]);
  const [loading, setLoading] = useState(false);

  const getJobs = async () => {
    try {
      setLoading(true);

      const jobResponse = await JobService.get();

      setJobs(jobResponse.data.jobOpenings);
    } catch (error) {
      console.log("error", error);
      toast.error("some errror Ocuured !!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked opportunities from top companies looking for talented
              professionals like you.
            </p>
          </div>

          {!loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredJobs.slice(0, 9).map((job, i) => (
                <Link href={`jobs/${job.id}`} key={i}>
                  <Card
                    key={job.id}
                    className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            <Image
                              src={job.logo_url}
                              width={40}
                              height={40}
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 cursor-pointer">
                              {job.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <Building className="h-4 w-4 mr-1" />
                              <span className="text-sm">{job.company}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{job.location}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center text-green-600 font-semibold">
                            <IndianRupee className="h-4 w-4 mr-1" />
                            <span>{job.salary} LPA</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {job.skills.split(",").map((skill: string, id) => (
                            <Badge
                              key={id}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(
                              parseISO(job.createdAt.toString()),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <>
              {[...Array(2)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex justify-evenly ${
                    rowIndex > 0 ? "mt-4" : ""
                  }`}
                >
                  {[...Array(3)].map((_, cardIndex) => (
                    <SkeletonCard key={cardIndex} />
                  ))}
                </div>
              ))}
            </>
          )}

          <div className="text-center mt-8">
            <Button className="border-blue-600 text-blue-600 bg-white hover:bg-blue-50">
              View All Jobs
            </Button>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default FeaturedJobs;
