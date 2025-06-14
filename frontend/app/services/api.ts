import axios from "axios";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default Api;
