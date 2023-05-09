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

export const getAllUsers = async (page, perPage) => {
  try {
    const res = await Request.get(
      ApiRoutes.GETALLUSERS + "/" + page + "/" + perPage
    );
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

export const updateVideoPercentage = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.UPDATEVIDEOPERCENTAGE, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getVideosWithPercentage = async (u_id) => {
  try {
    const res = await Request.get(
      ApiRoutes.GETVIDEOSWITHPERCENTAGE + "/" + u_id
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const insertVideoPercentage = async (data) => {
  try {
    const res = await Request.get(ApiRoutes.INSERTVIDEOPERCENTAGE, data);
    return res;
  } catch (error) {
    throw error;
  }
};
export const getQuestionsForQuiz = async (v_id) => {
  try {
    const res = await Request.get(ApiRoutes.GETQUESTIONSFORQUIZ + "/" + v_id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getOptionsForQuizById = async (q_id) => {
  try {
    const res = await Request.get(ApiRoutes.GETOPTIONSFORQUIZBYID + "/" + q_id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const insertQuiz = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.INSERTQUIZ, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getQuizResult = async (u_id, v_id, type) => {
  try {
    const res = await Request.get(
      ApiRoutes.GETQUIZRESULT + "/" + u_id + "/" + v_id + "/" + type
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.UPDATEPROFILE, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.UPDATEPASSWORD, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const insertCourse = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.INSERTCOURSE, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.UPDATECOURSE, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const res = await Request.get(ApiRoutes.GETCOURSES);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getVideosByCourse = async (c_id) => {
  try {
    const res = await Request.get(ApiRoutes.GETVIDEOSBYCOURSE + "/" + c_id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getQuizReport = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.GETQUIZREPORT, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getExcelQuizReport = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.GETEXCELQUIZREPORT, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCertificateStatus = async (u_id) => {
  try {
    const res = await Request.get(
      ApiRoutes.UPDATECERTIFICATESTATUS + "/" + u_id
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (u_id) => {
  try {
    const res = await Request.get(ApiRoutes.GETUSERSDATABYID + "/" + u_id);
    return res;
  } catch (error) {
    throw error;
  }
};
