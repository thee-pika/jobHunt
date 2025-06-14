import JobT from "../types/interfaces/job";
import Api from "./api";

const JobService = {
  create: (
    accessToken: string,
    payload: {
      title: string;
      location: string;
      logo_url: string;
      type: string;
      salary: number;
      company: string;
      skills: string;
      deadline: Date | null;
    }
  ) => {
    return Api.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  get: () => {
    return Api.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/`);
  },
  getMyJObs: (accessToken: string) => {
    return Api.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getById: (accessToken: string, jobId: string) => {
    return Api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  update: (accessToken: string, payload: unknown, id: string) => {
    return Api.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  delete: (accessToken: string, compId: string) => {
    return Api.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/${compId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default JobService;
