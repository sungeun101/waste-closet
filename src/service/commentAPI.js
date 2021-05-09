import axios from 'axios';
import { baseURL } from './config';

const endpoint = '/answers';

// const getbyId = (id) => {
//   return axios.get(baseURL + endpoint + '/' + id);
// };

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

export const commentService = {
  // getbyId,
  getAll,
  add,
  update,
  remove,
};
