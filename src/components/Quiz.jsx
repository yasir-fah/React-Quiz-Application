import { useState, useCallback } from "react";
import completeImg from "../assets/quiz-complete.png";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";

const TIMER = 5000;
function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const userQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isComplete = userQuestionIndex == QUESTIONS.length;

  // callBack:dependency array is empty ([]). This means handleUserAnswer will only be 'created' once
  const handleUserAnswer = useCallback(
    function handleUserAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((current) => {
        return [...current, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[userQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [userQuestionIndex]
  );

  const handleNextQuestion = useCallback(() => {
    handleUserAnswer(null);
  }, [handleUserAnswer]); // since we make 'handleUserAnswer' with callback & empty [], this also won't be created again

  if (isComplete) {
    return (
      <div id="summary">
        <img src={completeImg} alt="quiz completion" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={userQuestionIndex}
        questionText={QUESTIONS[userQuestionIndex].text}
        answers={QUESTIONS[userQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleUserAnswer}
        handleNextQuestion={handleNextQuestion}
      />
    </div>
  );
}
export default Quiz;
