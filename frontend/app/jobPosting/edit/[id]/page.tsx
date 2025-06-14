"use client";

import { FormEvent, useEffect, useState } from "react";

import useAuth from "@/app/hooks/useAuth";
import CompanyService from "@/app/services/company-service";
import JobService from "@/app/services/job-service";
import CompanyI from "@/app/types/interfaces/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

interface TJob {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: number;
  company: string;
  logo_url: string;
  skills: string;
  deadline: Date | null | string;
}
const EditJobDetails = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<CompanyI[]>([]);
  const [jobDetails, setJobDetails] = useState<TJob | null>(null);

  const [jobForm, setJobForm] = useState<TJob>({
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

  const jobTypes = ["fullTime", "PartTime", "Internship"];

  useEffect(() => {
    fetchCompanies();
    fetchJobDetails();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        router.push("/auth/login");
        return;
      }
      const res = await CompanyService.get(accessToken);
      if (res.status === 200) setCompanies(res.data.companies);
    } catch (err) {
      console.log("err", err);
      setError("Failed to fetch companies.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      if (!id || !accessToken)
        throw new Error("Job ID or accessToken not found.");
      const res = await JobService.getById(accessToken, id as string);
      const jobData = res.data.jobOpening;
      setJobDetails(jobData);
      setJobForm({
        ...jobData,
        deadline: jobData.deadline ? new Date(jobData.deadline) : null,
      });
    } catch (err) {
        console.log("err", err);
      setError("Failed to fetch job details.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof TJob, value: unknown) => {
    setJobForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!jobDetails || !accessToken)
        throw new Error("Job details are not loaded.");
      const form = new FormData();

      Object.keys(jobForm).forEach((key) => {
        const typedKey = key as keyof TJob;
        const formValue = jobForm[typedKey];

        if (formValue !== jobDetails[typedKey]) {
          form.append(
            key,
            formValue instanceof Date
              ? formValue.toISOString()
              : String(formValue)
          );
        }
      });

      const response = await JobService.update(
        accessToken,
        form,
        id! as string
      );

      if (response.status === 201) {
        toast.success("Job details updated successfully.");
        router.push("/");
      }
    } catch (err) {
      toast.error("Failed to update job details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Update Job Details
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Job Title */}
              <div>
                <label className="block mb-2 font-medium">Job Title</label>
                <Input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  required
                />
              </div>
              {/* Salary */}
              <div>
                <label className="block mb-2 font-medium">Salary</label>
                <Input
                  type="number"
                  value={jobForm.salary}
                  onChange={(e) =>
                    handleFormChange("salary", Number(e.target.value))
                  }
                  required
                />
              </div>
              {/* Location */}
              <div>
                <label className="block mb-2 font-medium">Location</label>
                <Input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                  required
                />
              </div>
              {/* Skills */}
              <div>
                <label className="block mb-2 font-medium">Skills</label>
                <Textarea
                  value={jobForm.skills}
                  onChange={(e) => handleFormChange("skills", e.target.value)}
                  required
                />
              </div>
              {/* Deadline */}
              <div>
                <label className="block mb-2 font-medium">Deadline</label>
                <Input
                  type="date"
                  value={
                    jobForm.deadline
                      ? jobForm.deadline instanceof Date
                        ? jobForm.deadline.toISOString().split("T")[0]
                        : jobForm.deadline
                      : ""
                  }
                  onChange={(e) =>
                    handleFormChange("deadline", new Date(e.target.value))
                  }
                  required
                />
              </div>
              {/* Company Selection */}
              <div>
                <label className="block mb-2 font-medium">Company</label>
                <Select
                  onValueChange={(value) => handleFormChange("company", value)}
                  value={jobForm.company}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((comp) => (
                      <SelectItem value={comp.name} key={comp.id}>
                        {comp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Job Type */}
              <div>
                <label className="block mb-2 font-medium">Job Type</label>
                <Select
                  onValueChange={(value) => handleFormChange("type", value)}
                  value={jobForm.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Submit Button */}
              <div>
                <Button type="submit" className="w-full">
                  Update
                </Button>
              </div>
            </form>
          </div>
          <Toaster />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default EditJobDetails;
