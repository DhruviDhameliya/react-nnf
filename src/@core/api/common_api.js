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

export const insertVideo = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.INSERTVIDEO, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateVideo = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.UPDATEVIDEO, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getVideos = async () => {
  try {
    const res = await Request.get(ApiRoutes.GETVIDEOS);
    return res;
  } catch (error) {
    throw error;
  }
};

export const insertQuestion = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.INSERTQUESTION, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.UPDATEQUESTION, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getQuestions = async () => {
  try {
    const res = await Request.get(ApiRoutes.GETQUESTIONS);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getOptionsById = async (data) => {
  try {
    const res = await Request.get(ApiRoutes.GETOPTIONSBYID + "/" + data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteOption = async (id) => {
  try {
    const res = await Request.get(ApiRoutes.DELETEOPTION + "/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};
