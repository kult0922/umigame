/* eslint-disable react/display-name */
import { Question, QuestionStatus } from "../hooks/firebase";
import React from "react";
import { Card } from "./Card";

type Props = {
  questions: Question[];
  status: QuestionStatus;
  updateQuestionStatus: (questionId: string, status: QuestionStatus) => void;
};

export const DecidedCardCol = React.memo(({ questions, status, updateQuestionStatus }: Props) => {
  return (
    <>
      {status === "yes" && <div className="text-2xl bg-red-300 w-96">はい</div>}
      {status === "neutral" && <div className="text-2xl bg-green-300 w-96">どちらでもない</div>}
      {status === "no" && <div className="text-2xl bg-blue-300 w-96">いいえ</div>}
      {questions.map((question, idx) => {
        return (
          <div key={"decided" + idx} className="m-1">
            <Card showOption={false} question={question} updateQuestionStatus={updateQuestionStatus}></Card>
          </div>
        );
      })}
    </>
  );
});
