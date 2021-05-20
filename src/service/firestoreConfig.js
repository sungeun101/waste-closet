import { projectFirestore } from './firebase';

const db = projectFirestore.collection('/comments');

const getAll = () => {
  return db;
};

const add = (comment) => {
  return db.add(comment);
};

const update = (id, value) => {
  return db.doc(id).update(value);
};

const remove = (id) => {
  return db.doc(id).delete();
};

export const dbService = {
  getAll,
  add,
  update,
  remove,
};
