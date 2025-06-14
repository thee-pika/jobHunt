"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuth from "@/app/hooks/useAuth";
import CompanyI from "@/app/types/interfaces/company";
import CompanyService from "@/app/services/company-service";
import JobService from "@/app/services/job-service";
import JobT from "@/app/types/interfaces/job";

const EditJObDetails = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyI[]>([]);
  const [jobDetails, setJobDetails] = React.useState<JobT | null>();
  const [selectedCompany, setSelectedCompany] = useState<{
    id: string | null;
    url: string | null;
  }>({
    id: null,
    url: null,
  });
  const [jobForm, setJobForm] = useState<{
    id: string;
    title: string;
    location: string;
    type: string;
    salary: number;
    company: string;
    logo_url: string;
    skills: string;
    deadline: Date | null | string;
  }>({
    id: "",
    title: "",
    location: "",
    type: "",
    salary: 0,
    logo_url: "",
    company: "",
    skills: "",
    deadline: null,
  });
  const router = useRouter();

  const userCompanies = async () => {
    try {
      setLoading(true);
      if (accessToken) {
        const res = await CompanyService.get(accessToken);
        if (res.status === 200) {
          const comp = res.data.companies;
          setCompanies(comp);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const jobType = ["fullTime", "PartTime", "Internship"];

  useEffect(() => {
    userCompanies();
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    try {
      setLoading(true);
      if (!accessToken || !id) {
        console.log("not foundddddddddddddddddddd");
        return;
      }
      const res = await JobService.getById(accessToken, id as string);
      const jobData = res.data.jobOpening as JobT;
      console.log("company in edit ", jobData.company);
      setJobDetails(jobData);
      setJobForm((prev) => ({
        ...prev,
        id: jobData.id,
        title: jobData.title,
        location: jobData.location,
        type: jobData.type,
        salary: jobData.salary,
        logo_url: jobData.logo_url,
        company: jobData.company,
        skills: jobData.skills,
        deadline: jobData.deadline ? new Date(jobData.deadline) : null,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!jobDetails) {
        toast("Job details are not loaded.");
        return;
      }

      //     const updatedFields: Partial<typeof jobForm> = {};
      const form = new FormData();
      //     (Object.keys(jobForm) as (keyof typeof jobForm)[]).forEach((key) => {
      //       if (jobForm[key] !== jobDetails[key as keyof typeof jobForm]) {
      //         // updatedFields[key] = jobForm[key];
      //         form.append(key, jobForm[key] )
      //       }
      //     });
      console.log("jobDetails", jobDetails);

      for (const key in jobForm) {
        const typedKey = key as keyof typeof jobForm;
        if (
          typedKey !== "deadline" &&
          jobForm[typedKey] !== jobDetails[typedKey]
        ) {
          console.log(
            "jobForm[typedKey]",
            jobForm[typedKey],
            "jobDetails[typedKey]",
            jobDetails[typedKey]
          );
          console.log("updating", typedKey, jobForm[typedKey]);
          form.append(key, jobForm[typedKey] as any);
        } else {
          if (jobForm[typedKey] !== jobDetails[typedKey]) {
            const value = jobForm[typedKey];
            console.log("value", value);
            if (value instanceof Date) {
              form.append(key, value.toISOString());
            } else if (typeof value === "string") {
              form.append(key, value);
            }
          }
        }
      }

      // if (Object.keys(updatedFields).length === 0) {
      //   toast("No changes to update.");
      //   return;
      // }

      // form.append("id", id as string);
      // const updatedForm = {
      //   ...updatedFields,
      //   id: id as string,
      //   deadline: jobForm.deadline ?? null,
      // };

      if (selectedCompany.id !== null) {
        const cmp = companies.find((comp) => comp.name === selectedCompany.id);

        console.log("cmp", cmp);
        if (!cmp) {
          toast("Please select a valid company.");
          return;
        }

        form.set("company", cmp.name);
        form.set("logo_url", cmp.logo_url);
      }

      // updatedForm = {
      //   ...jobForm,
      //   id: id as string,
      //   logo_url: cmp.logo_url,
      //   company: cmp.name,
      // };

      if (!accessToken || !jobForm || !id) {
        console.log("not foundddddddddddddddddddd");
        return;
      }

      const res = await JobService.update(accessToken, form, id as string);

      if (res.status === 201) {
        toast("New Job posted.");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log("Error creating job posting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              update JOb Details
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="title"
                >
                  Job Title
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter job title"
                  value={jobForm.title}
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="salary"
                >
                  Salary
                </label>
                <Input
                  type="number"
                  id="salary"
                  name="salary"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter salary"
                  value={jobForm.salary}
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      salary: parseInt(e.target.value),
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                  value={jobForm.location}
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="skills"
                >
                  Required Skills
                </label>
                <Textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter skills (comma-separated)"
                  value={jobForm.skills}
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      skills: e.target.value,
                    }))
                  }
                  required
                ></Textarea>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="deadline"
                >
                  Application DeadLine
                </label>
                <Input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={
                    jobForm.deadline
                      ? jobForm.deadline instanceof Date
                        ? jobForm.deadline.toISOString().split("T")[0]
                        : jobForm.deadline
                      : ""
                  }
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      deadline: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    }))
                  }
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="company"
                  >
                    Company Name
                  </label>

                  <Select
                    onValueChange={(value) =>
                      // setJobForm((prev) => ({ ...prev, company: value }))
                      setSelectedCompany((prev) => ({ id: value, url: "" }))
                    }
                    value={jobForm.company}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Company</SelectLabel>
                        {companies.length > 0 ? (
                          companies.map((comp, i) => (
                            <SelectItem value={comp.name} key={i}>
                              {comp.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no company">
                            No Company Found
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="type"
                  >
                    Job Type
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setJobForm((prev) => ({ ...prev, type: value }))
                    }
                    value={jobForm.type}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select JobType" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        {jobType.length > 0 ? (
                          jobType.map((job, i) => (
                            <SelectItem value={job} key={i}>
                              {job}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no job type">
                            No JOb TYpe Found
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium p-3 rounded-lg hover:bg-blue-600 transition"
                >
                  {loading ? "updating .." : "update"}
                </Button>
              </div>
            </form>
          </div>
          <Toaster />
        </div>
      ) : (
        <div>LOADING ...</div>
      )}
    </>
  );
};

export default EditJObDetails;
