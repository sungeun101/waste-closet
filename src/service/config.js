import axios from 'axios';

export const baseURL =
  'https://limitless-sierra-67996.herokuapp.com/v1/questions';

const getAll = (params) => {
  console.log(params);
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

export const Service = {
  getAll,
  add,
  update,
  remove,
};
