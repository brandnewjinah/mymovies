import axios from "axios";

// const URL = "http://localhost:5000";
const URL = "https://jinah-movies.herokuapp.com";

export const publicRequest = axios.create({
  baseURL: URL,
});
