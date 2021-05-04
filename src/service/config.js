import axios from 'axios';

export const baseURL =
  'https://limitless-sierra-67996.herokuapp.com/v1/questions';
export const commentURL =
  'https://limitless-sierra-67996.herokuapp.com/v1/answers';

const getAll = (params) => {
  return axios.get(baseURL + '?sortBy=createdAt%3Adesc', params);
};

const add = (data) => {
  return axios.post(baseURL, data);
};

const update = (id, data) => {
  return axios.patch(baseURL + '/' + id, data);
};

const remove = (id) => {
  return axios.delete(baseURL + '/' + id);
};

const addComment = (data) => {
  return axios.post(commentURL, data);
};

const getCommentbyId = (id) => {
  return axios.get(commentURL + '/' + id);
};

const getAllComments = (params) => {
  return axios.get(commentURL, params);
};

const updateComment = (id, data) => {
  return axios.patch(commentURL + '/' + id, data);
};

const removeComment = (id) => {
  return axios.delete(commentURL + '/' + id);
};

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
