import { projectFirestore } from './firebase';

export const commentsRef = projectFirestore.collection('/comments');

const add = (commentObj) => {
  return commentsRef.add(commentObj);
};

const update = (id, value) => {
  return commentsRef.doc(id).update(value);
};

const remove = (id) => {
  return commentsRef.doc(id).delete();
};

export const commentService = {
  add,
  update,
  remove,
};
