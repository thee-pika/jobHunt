import Api from "./api";

const userService = {
  get: (accessToken: string) => {
    return Api.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default userService;
