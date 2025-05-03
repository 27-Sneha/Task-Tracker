import axios from "axios";

const apiCaller = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiCaller;
