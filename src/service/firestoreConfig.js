import { projectFirestore } from './firebase';

const commentsRef = projectFirestore.collection('/comments');

const getAll = () => {
  return commentsRef;
};

const add = (comment) => {
  return commentsRef.add(comment);
};

const update = (id, value) => {
  return commentsRef.doc(id).update(value);
};

const remove = (id) => {
  return commentsRef.doc(id).delete();
};

export const dbService = {
  getAll,
  add,
  update,
  remove,
};
