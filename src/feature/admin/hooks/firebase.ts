import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseConfig } from "src/config/firebase";

export type QuestionStatus = "yes" | "no" | "neutral" | "reject" | "waiting";

export type Question = {
  id: string;
  status: QuestionStatus;
  content: string;
};

export const useFirestore = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, "questions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionsFromFireBase: Question[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.id);
        questionsFromFireBase.push({ id: doc.id, status: doc.data().status, content: doc.data().content });
        setQuestions(questionsFromFireBase);
      });
    });

    return unsubscribe;
  }, []);

  const updateQuestionStatus = async (id: string, status: QuestionStatus) => {
    const washingtonRef = doc(db, "questions", id);
    await updateDoc(washingtonRef, {
      status: status,
    });
  };

  return { questions, updateQuestionStatus };
};
