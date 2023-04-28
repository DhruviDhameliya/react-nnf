import Request from ".";

import { ApiRoutes } from "../constants";

export const OtpRequest = async (formdata) => {
  try {
    const res = await Request.post(ApiRoutes.OTP, formdata);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const checkEmail = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.CHECKEMAIL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const checkMobile = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.CHECKMOBILE, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.REGISTER, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAttributeById = async (type) => {
  try {
    const res = await Request.get(ApiRoutes.GETATTRIBUTEBYID + "/" + type);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
