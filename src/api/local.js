import axios from "axios";

const URL = "http://localhost:5000";

export const publicRequest = axios.create({
  baseURL: URL,
});
