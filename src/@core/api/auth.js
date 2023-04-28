import Request from ".";
import { ApiRoutes } from "../constants";

const LoginRequest = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.LOGIN, data);
    return res;
  } catch (error) {
    throw error;
  }
};
const RegistrationRequest = async (formdata) => {
  try {
    const res = await Request.post(ApiRoutes.REGISTRATION, formdata);
    return res;
  } catch (error) {
    throw error;
  }
};
export { LoginRequest, RegistrationRequest };
