import { initializeApp } from "firebase/app";
import { addDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { firebaseConfig } from "src/config/firebase";

export const AskComponent = () => {
  const [question, setQuestion] = useState<string>("");

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "questions"), {
      content: question,
      status: "waiting",
    });
    setQuestion("");
  };

  return (
    <>
      <div className="mt-20">
        <div className="flex justify-center">質問を入力して送信してね</div>
        <div className="flex justify-center mt-8">
          <textarea
            className="border-2 w-[80%]"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="rounded-full p-3 bg-red-500 text-white cursor-pointer"
          onClick={() => handleSubmit()}
        >
          質問を送信する
        </button>
      </div>
    </>
  );
};
