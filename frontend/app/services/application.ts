import Api from "./api";

const ApplicationService = {
  create: (
    accessToken: string,
    payload: {
      jobId: string;
      recruterId: string;
      role: string;
      company: string;
      resume: string | undefined;
    }
  ) => {
    return Api.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/application/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  get: (accessToken: string) => {
    return Api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/application/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  getById: (accessToken: string, id: string) => {
    return Api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/application/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  update: (accessToken: string, payload: { status: string }, id: string) => {
    return Api.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/job/application/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default ApplicationService;
