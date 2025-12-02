import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

const TIMER = 5000;
function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const userQuestionIndex =userAnswers.length;
  const isComplete = userQuestionIndex == QUESTIONS.length;

  // callBack:dependency array is empty ([]). This means handleUserAnswer will only be 'created' once, React will memoize it.
  const handleUserAnswer = useCallback(
    function handleUserAnswer(selectedAnswer) {
      setUserAnswers((current) => {
        return [...current, selectedAnswer];
      });
    },
    []
  );

  const handleNextQuestion = useCallback(() => {
    handleUserAnswer(null);
  }, [handleUserAnswer]); // since we make 'handleUserAnswer' with callback & empty [], this also won't be created again

  if (isComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={userQuestionIndex}
        questionIndex={userQuestionIndex}
        onSelectAnswer={handleUserAnswer}
        handleNextQuestion={handleNextQuestion}
      />
    </div>
  );
}
export default Quiz;
