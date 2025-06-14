import Api from "./api";

const AuthService = {
  login: (payload: { email: string; password: string }) => {
    return Api.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/auth/login`, payload);
  },
};

export default AuthService;
