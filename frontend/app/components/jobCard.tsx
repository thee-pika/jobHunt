import React from "react";
import JobT from "../types/interfaces/job";
import Image from "next/image";
import { MapPin, Building, Clock, IndianRupee } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, parseISO } from "date-fns";

const JobCard = ({ job }: { job: JobT }) => {
  return (
    <Card
      key={job.id}
      className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              <Image src={job.logo_url} width={40} height={40} alt="" />
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
            {job.skills.split(",").map((skill: string) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(parseISO(job.createdAt.toString()), {
                addSuffix: true,
              })}
            </span>
            <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
