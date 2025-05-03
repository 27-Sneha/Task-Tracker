import { loginUrl, signupUrl } from "../constants/urls";
import apiCaller from "./apiCaller";

export const login = async (loginCredentials) => {
  const response = await apiCaller.post(loginUrl, loginCredentials);
  localStorage.setItem("token", response.data.token);
};

export const register = async (registerCredentials) => {
  await apiCaller.post(signupUrl, registerCredentials);
};
