import axios from "axios";

export const baseURL = "https://limitless-sierra-67996.herokuapp.com/v1";

const endpoints = {
  questions: baseURL + "/questions",
};

export const commentURL =
  "https://limitless-sierra-67996.herokuapp.com/v1/answers";

const getAll = (params) => {
  // params로 넘겨도 됨
  return axios.get(endpoints.questions + "?sortBy=createdAt%3Adesc" + params);
};

// questions 와 comments 파일 따로 만들기
const add = (data) => {
  return axios.post(baseURL, data);
};

const update = (id, data) => {
  return axios.patch(baseURL + "/" + id, data);
};

const remove = (id) => {
  return axios.delete(baseURL + "/" + id);
};

const addComment = (data) => {
  return axios.post(commentURL, data);
};

const getCommentbyId = (id) => {
  console.log(id);
  return axios.get(commentURL + "/" + id);
};

const getAllComments = (params) => {
  console.log(params);
  return axios.get(commentURL, params);
};

const updateComment = (id, data) => {
  return axios.patch(commentURL + "/" + id, data);
};

const removeComment = (id) => {
  return axios.delete(commentURL + "/" + id);
};

// 컴포넌트가 때문에 소문자로 해주는게 컨벤션이에요
export const Service = {
  getAll,
  add,
  update,
  remove,
  addComment,
  getCommentbyId,
  getAllComments,
  updateComment,
  removeComment,
};
