import { useFirestore } from "src/feature/admin/hooks/firebase";
import { DecidedCardCol } from "./component/DecidedCardCol";
import { WaitingCardCol } from "./component/WaitingCardCol";
import { RejectedCardCol } from "./component/RejectedCardCol";
import { useState } from "react";

export const AdminComponent = () => {
  const { questions, updateQuestionStatus } = useFirestore();
  const [isShowRejected, setIsShowRejected] = useState(false);

  const switchRejected = () => {
    setIsShowRejected(!isShowRejected);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mx-2 bg-red-300 p-2 rounded-md">
          <DecidedCardCol
            status="yes"
            questions={questions.filter((elm) => elm.status === "yes")}
            updateQuestionStatus={updateQuestionStatus}
          />
        </div>
        <div className="mx-2 bg-blue-300 p-2 rounded-md">
          <DecidedCardCol
            status="no"
            questions={questions.filter((elm) => elm.status === "no")}
            updateQuestionStatus={updateQuestionStatus}
          />
        </div>
        <div className="mx-2 bg-green-300 p-2 rounded-md">
          <DecidedCardCol
            status="neutral"
            questions={questions.filter((elm) => elm.status === "neutral")}
            updateQuestionStatus={updateQuestionStatus}
          />
        </div>
      </div>

      <div className="mt-16 ml-5">
        <div className="text-2xl">回答まち</div>
        <WaitingCardCol
          questions={questions.filter((elm) => elm.status === "waiting")}
          updateQuestionStatus={updateQuestionStatus}
        />
      </div>

      <div className="mt-[600px]">
        <span onClick={switchRejected} className="cursor-pointer">
          debug
        </span>
        {isShowRejected && (
          <RejectedCardCol
            questions={questions.filter((elm) => elm.status === "reject")}
            updateQuestionStatus={updateQuestionStatus}
          />
        )}
      </div>
    </>
  );
};
