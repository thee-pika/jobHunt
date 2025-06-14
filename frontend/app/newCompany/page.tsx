"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "../hooks/useAuth";
import { toast, Toaster } from "sonner";

const CompanyRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    location: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const router = useRouter();
  const { accessToken } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!logo) {
      toast.error("Please upload a logo.");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("location", formData.location);
      form.append("description", formData.description);
      form.append("image", logo);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/company/register`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Company registered successfully!");
        setFormData({ name: "", title: "", description: "", location: "" });
        setLogo(null);
        router.push("/");
      } else {
        toast.error(response.data.message || "Failed to register the company.");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error("An error occurred while registering the company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg  p-4 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-xl font-bold mb-4">Register a New Company</h2>

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
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
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
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-medium rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Register Company"}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default CompanyRegistrationForm;
