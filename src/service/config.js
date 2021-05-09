import axios from 'axios';

export const baseURL = 'https://limitless-sierra-67996.herokuapp.com/v1';

const endpoint = '/questions';

const getAll = (params) => {
  return axios.get(baseURL + endpoint, params);
};

const add = (data) => {
  return axios.post(baseURL + endpoint, data);
};

const update = (id, data) => {
  return axios.patch(baseURL + endpoint + '/' + id, data);
};

const remove = (id) => {
  return axios.delete(baseURL + endpoint + '/' + id);
};

export const questionService = {
  getAll,
  add,
  update,
  remove,
};
