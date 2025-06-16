export const BASE_URL = "http://localhost:5000"

export const API_PATHS = {
  AUTH:{
    REGISTER: "/api/auth/register", //sign up
    LOGIN:"/api/auth/login",// Authentication and set jwt on cookie
    GET_PROFILE:"/api/auth/profile" // get user details
  },
  RESUME:{
    CREATE : "/api/resume", // create new
    GET_ALL: "/api/resume", // get - get all resume
    GET_BY_ID: (id) => `/api/resume/${id}`, // get - get by id
    UPDATE: (id) =>  `/api/resume/${id}`,  // put - update resume
    DELETE: (id) => `/api/resume/${id}`, // delete - resume
    // UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
  },
  // IMAGE:{
  //   UPLOAD_IMAGE : "/api/auth/upload-image"
  // }
}