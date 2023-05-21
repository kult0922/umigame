/* eslint-disable react/display-name */
import { Question, QuestionStatus } from "../hooks/firebase";
import React from "react";
import { Card } from "./Card";

type Props = {
  questions: Question[];
  updateQuestionStatus: (questionId: string, status: QuestionStatus) => void;
};

export const WaitingCardCol = React.memo(({ questions, updateQuestionStatus }: Props) => {
  return (
    <>
      {questions.map((question, idx) => {
        return (
          <Card
            key={idx}
            showOption={true}
            question={question}
            updateQuestionStatus={updateQuestionStatus}
          ></Card>
        );
      })}
    </>
  );
});
