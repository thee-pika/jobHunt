"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/app/hooks/useAuth";
import CompanyService from "@/app/services/company-service";
import CompanyI from "@/app/types/interfaces/company";
import { toast, Toaster } from "sonner";
import SkeletonL from "@/app/components/loader/Loader";

const EditCompanyDetails = () => {
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<CompanyI | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const router = useRouter();
  const { accessToken } = useAuth();
  const { id } = useParams();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  useEffect(() => {
    getCompanyDetailsById();
  }, []);

  const getCompanyDetailsById = async () => {
    try {
      setLoading(true);

      if (!accessToken || !id) {
      
        return;
      }

      const companyres = await CompanyService.getById(
        accessToken,
        id as string
      );

      const { name, description, location } = companyres.data.company;

      setFormData((prev) => ({
        ...prev,
        name,
        description,
        location,
      }));

      setCompanyDetails(companyres.data.company);
    } catch (error: unknown) {
      toast.error("error ocuured.");
    
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const form = new FormData();
      if (formData.name !== companyDetails?.name) {
       
        form.append("name", formData.name);
      }
      if (formData.location !== companyDetails?.location) {

        form.append("location", formData.location);
      }
      if (formData.description !== companyDetails?.description) {

        form.append("description", formData.description);
      }

      if (logo) {

        form.append("image", logo);
      }

      if (form.entries().next().done) {
        toast.error("No changes to update.");
        return;
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/company/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Company updated successfully!");
        setFormData({ name: "", description: "", location: "" });
        setLogo(null);
        router.push("/");
      } else {
        toast.error(response.data.message || "Failed to register the company.");
      }
    } catch (error) {

      toast.error("An error occurred while registering the company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="h-[90vh] flex justify-center items-center w-full">
          <form
            onSubmit={handleUpdate}
            className="max-w-lg  p-4 bg-white shadow-md rounded-lg"
          >
            <h2 className="text-xl font-bold mb-4">update Company Details</h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></Textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></Input>
            </div>

            <div className="mb-4">
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700"
              >
                Company Logo
              </label>
              <Input
                type="file"
                id="logo"
                name="logo"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white font-medium rounded-md ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "updating..." : "update"}
            </button>
          </form>
        </div>
      ) : (
        <>
           <div className=" flex flex-col items-center mt-8 mb-8">
            <SkeletonL />
            {[...Array(6)].map((_, i) => (
              <div className="m-8" key={i}>
                <SkeletonL />
              </div>
            ))}
          </div>
        </>
      )}
      <Toaster/>
    </>
  );
};

export default EditCompanyDetails;
