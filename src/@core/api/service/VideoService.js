import Request from "../index";

import { ApiRoutes } from "../../constants";
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

  export const getVideosByCourse = async (c_id) => {
    try {
      const res = await Request.get(ApiRoutes.GETVIDEOSBYCOURSE + "/" + c_id);
      return res;
    } catch (error) {
      throw error;
    }
  };