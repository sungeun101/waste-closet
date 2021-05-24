import { projectFirestore } from './firebase';

const commentsRef = projectFirestore.collection('/comments');

const add = (comment) => {
  return commentsRef.add(comment);
};

const update = (id, value) => {
  return commentsRef.doc(id).update(value);
};

const remove = (id) => {
  return commentsRef.doc(id).delete();
};

export const commentService = {
  commentsRef,
  add,
  update,
  remove,
};