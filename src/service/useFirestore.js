import { showErrorMsg } from 'messages';
import { useState, useEffect } from 'react';
import { projectFirestore } from './firebase';

const useFirestore = (questionId) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    try {
      const unsubscribe = projectFirestore
        .collection('comments')
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
  }, []);

  return { docs };
};

export default useFirestore;
