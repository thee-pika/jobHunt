"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import CompanyService from "../services/company-service";
import JobService from "../services/job-service";
import CompanyI from "../types/interfaces/company";

const JobPosting = () => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyI[]>([]);
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    url: "",
  });
  const [jobForm, setJobForm] = useState<{
    title: string;
    location: string;
    type: string;
    salary: number;
    company: string;
    logo_url: string;
    skills: string;
    deadline: Date | null;
  }>({
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
  }, []);

  const createJobPosting = async (form: typeof jobForm) => {
    if (!accessToken || !jobForm) {
      console.log("not foundddddddddddddddddddd");
      return;
    }
    try {
      setLoading(true);
      const res = await JobService.create(accessToken, form);

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

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const cmp = companies.find((comp) => comp.id === selectedCompany.id);

      if (cmp) {
        console.log("cmp", cmp);
        const updatedForm = {
          ...jobForm,
          logo_url: cmp.logo_url,
          company: cmp.name,
        };

        await createJobPosting(updatedForm);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("some error occured!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Post a Job
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
              onChange={(e) =>
                setJobForm((prev) => ({
                  ...prev,
                  deadline: e.target.value ? new Date(e.target.value) : null,
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
                  setSelectedCompany(() => ({ id: value, url: "" }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    {companies.length > 0 ? (
                      companies.map((comp, i) => (
                        <SelectItem value={comp.id} key={i}>
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
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Company" />
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
              disabled={loading}
            >
              {loading ? "loading" : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default JobPosting;
