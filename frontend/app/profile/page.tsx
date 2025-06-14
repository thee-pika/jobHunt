"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import ApplicationT from "../types/interfaces/application";
import ApplicationService from "../services/application";
import { Camera } from "lucide-react";
import Image from "next/image";

const UserProfile = () => {
  const { accessToken, user, updateResume } = useAuth();
  const [resume, setResume] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>("");
  const [jobRole, setJobRole] = useState<string | null>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationT[]>([]);

  useEffect(() => {
    if (user?.resume) {
      setResume(user.resume);
    }
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      setLoading(true);
      if (accessToken) {
        const res = await ApplicationService.get(accessToken);
        setApplications(res.data.applications);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);

      if (user) {
        console.log("im iniside eeeeeeee");
        setJobRole(user.jobRole);
        setBio(user.bio);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  console.log("user in profile sectinnnnnnnnn", user);
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "resume" | "avatar"
  ) => {
    try {
      setLoading(true);
      const file = e.target.files?.[0];

      const formData = new FormData();
      formData.append("image", file!);
      console.log("type", type);

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        if (type === "resume") {
          updateResume(res.data.user);
          setResume(res.data.user.resume);
        } else {
          setAvatar(res.data.user.avatar);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      console.log(jobRole, bio);

      if (jobRole === "" && bio === "") {
        alert("before save modify!!");
      }

      const form = {
        jobRole,
        bio,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/update`,
        form,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        const updatedUser = res.data.user;

        setJobRole(updatedUser.jobRole);
        setBio(updatedUser.bio);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
          <div className="w-full bg-blue-700 h-48 flex items-center justify-center text-white text-2xl font-semibold">
            Profile Banner
          </div>

          <div className="bg-white shadow-lg rounded-2xl mt-[-50px] w-4/5 max-w-4xl p-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                {avatar ? (
                  <Image
                    src={avatar || "/default-avatar.png"}
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="w-24 h-24 rounded-full border-4 border-white shadow object-cover"
                  />
                ) : (
                  <label
                    htmlFor="uploadAvatar"
                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer"
                    title="Upload Avatar"
                  >
                    <Camera className="text-white" />
                    <Input
                      id="uploadAvatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUpload(e, "avatar")}
                    />
                  </label>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.fullName || "User Name"}
                </h2>
                <Input
                  value={jobRole || ""}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="Your Job Role"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bio</h3>
              <textarea
                value={bio || ""}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Resume
              </h3>
              <div className="flex items-center gap-4">
                {!resume ? (
                  <label htmlFor="uploadResume" className="cursor-pointer">
                    <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center gap-2">
                      <Upload size={20} />
                      Upload Resume
                    </Button>
                    <Input
                      id="uploadResume"
                      type="file"
                      onChange={(e) => handleUpload(e, "resume")}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                      onClick={() => setResume(null)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Applications
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 rounded-lg border">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="px-4 py-2 text-gray-600 font-medium">
                        Company
                      </th>
                      <th className="px-4 py-2 text-gray-600 font-medium">
                        Role
                      </th>
                      <th className="px-4 py-2 text-gray-600 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.length > 0 ? (
                      applications.map((app) => (
                        <tr key={app.id} className="border-t">
                          <td className="px-4 py-2 text-gray-800">
                            {app.company}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {app.role}
                          </td>
                          <td
                            className={`px-4 py-2 font-medium ${
                              app.status === "Accepted"
                                ? "text-gray-100 bg-green-600"
                                : app.status === "Rejected"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {app.status}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-2 text-center text-gray-700"
                        >
                          No Applications Found!!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleSaveProfile}
                className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
              >
                Save Profile
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default UserProfile;
