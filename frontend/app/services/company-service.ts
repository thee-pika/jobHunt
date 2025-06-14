import CompanyI from "../types/interfaces/company";
import Api from "./api";

const CompanyService = {
  create: () => {},
  get: (accessToken: string) => {
    return Api.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/company`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getById: (accessToken: string, compId: string) => {
    return Api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/company/${compId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  update: (accessToken: string, payload: CompanyI) => {
    return Api.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/company/${payload.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  delete: (accessToken: string, compId: string) => {
    return Api.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/company/${compId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default CompanyService;
