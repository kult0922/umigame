/* eslint-disable react/display-name */
import { Question, QuestionStatus } from "../hooks/firebase";
import React from "react";

type Props = {
  question: Question;
  showOption: boolean;
  updateQuestionStatus: (questionId: string, status: QuestionStatus) => void;
};

export const Card = React.memo(({ question, showOption, updateQuestionStatus }: Props) => {
  const [isShowOption, setIsShowOption] = React.useState<boolean>(showOption);

  const switchShowOption = () => {
    setIsShowOption(!isShowOption);
  };

  const handleYes = () => {
    updateQuestionStatus(question.id, "yes");
  };
  const handleNo = () => {
    updateQuestionStatus(question.id, "no");
  };
  const handleNeutral = () => {
    updateQuestionStatus(question.id, "neutral");
  };
  const handleReject = () => {
    updateQuestionStatus(question.id, "reject");
  };
  return (
    <>
      <div onClick={switchShowOption} className="w-80 border rounded-md cursor-pointer bg-white shadow-lg">
        <div className="flex justify-end">
          <div onClick={() => handleReject()} className="m-1 bg-red-500 w-3 h-3 rounded-lg"></div>
        </div>
        <div className="flex justify-between">
          <div className="text-2xl">{question.content}</div>
        </div>

        {isShowOption && (
          <div className="flex">
            <div className="mx-1">
              <button className="bg-red-300 rounded px-1" onClick={() => handleYes()}>
                はい
              </button>
            </div>
            <div className="mx-1">
              <button className="bg-blue-300 rounded px-1" onClick={() => handleNo()}>
                いいえ
              </button>
            </div>
            <div className="mx-1">
              <button className="bg-green-300 rounded px-1" onClick={() => handleNeutral()}>
                どちらでもない
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
