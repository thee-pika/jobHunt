"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import CompanyService from "../services/company-service";
import CompanyI from "../types/interfaces/company";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import SkeletonL from "../components/loader/Loader";
import { toast, Toaster } from "sonner";
import Image from "next/image";

const Companies = () => {
  const { accessToken } = useAuth();
  const [companies, setCompanies] = useState<CompanyI[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getCompanyDetails = async () => {
    try {
      setLoading(true);
      if (accessToken) {
        const res = await CompanyService.get(accessToken);

        if (res.status === 200) {
          setCompanies(res.data.companies);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("some error Occured!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const handleDelete = async (compId: string) => {
    try {
      setLoading(true);
      if (accessToken) {
        const res = await CompanyService.delete(accessToken, compId);

        if (res.status === 200) {
          toast.success("Company Deleted Successfully!!");
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
              <Link href="/newCompany">
                <button className="mb-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
                  Register
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
                    Description
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <tr
                      key={company.id}
                      className="border-t hover:bg-gray-100 transition"
                    >
                      <td className="p-4">
                        <Image
                          src={company.logo_url}
                          alt={`${company.name} logo`}
                          className="w-10 h-10 object-cover rounded-full"
                          width={40}
                          height={40}
                        />
                      </td>
                      <td className="p-4">{company.name}</td>
                      <td className="p-4 truncate">{company.description}</td>
                      <td className="p-4">{company.location}</td>
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
                                router.push(`/company/edit/${company.id}`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(company.id)}
                            >
                              Delete
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
                      No companies found.
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
            {[...Array(6)].map((_, i) => (
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

export default Companies;
