"use client";

import useAuth from "@/app/hooks/useAuth";
import ApplicationService from "@/app/services/application";
import ApplicationT from "@/app/types/interfaces/application";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const Applications = () => {
  const { accessToken } = useAuth();
  const [applications, setApplications] = useState<ApplicationT[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getApplications = async () => {
    try {
      setLoading(true);
      if (accessToken && id) {
        const res = await ApplicationService.getById(accessToken, id as string);
        setApplications(res.data.applications);
      }
    } catch (error) {
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const handleUpdateStatus = async (applicationId: string, status: string) => {
    try {
      
      const payload = { status };

      if (accessToken) {
        const res = await ApplicationService.update(
          accessToken,
          payload,
          applicationId
        );
        if (res.status === 200) {
          toast.success(`Status updated to ${status}!`);
         
          setApplications((prev) =>
            prev.map((app) =>
              app.id === applicationId ? { ...app, status } : app
            )
          );
        }
      }
    } catch (error) {
     
      toast.error(`Failed to update status to ${status}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">All Applications</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Company
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Resume
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-t hover:bg-gray-100 transition"
                    >
                      <td className="p-4">{application.company}</td>
                      <td className="p-4">{application.role}</td>
                      <td className="p-4 truncate">{application.status}</td>
                      <td className="p-4">{application.resume}</td>
                      {application.status === "Accepted" ||
                        (application.status === "Rejected" && (
                          <td className="p-4 text-center">
                            <button
                              onClick={() =>
                                handleUpdateStatus(application.id, "Accepted")
                              }
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mr-2"
                              disabled={loading}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(application.id, "Rejected")
                              }
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                              disabled={loading}
                            >
                              Reject
                            </button>
                          </td>
                        ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-4 text-center text-gray-500 italic"
                    >
                      No Applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>LOADING ...</div>
      )}
      <Toaster />
    </>
  );
};

export default Applications;
