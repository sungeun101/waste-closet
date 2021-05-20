import { showErrorMsg } from 'messages';
import { useState, useEffect } from 'react';
import { projectFirestore } from './firebase';

const useFirestore = (collection, questionId) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    try {
      const unsubscribe = projectFirestore
        .collection(collection)
        .where('questionId', '==', questionId)
        .orderBy('timestamp', 'asc')
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        });
      return () => unsubscribe();
    } catch (error) {
      showErrorMsg();
      console.log(error);
    }
  }, [collection]);

  return { docs };
};

export default useFirestore;
