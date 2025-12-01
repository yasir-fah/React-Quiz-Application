import { useState, useEffect, useCallback } from "react";
import completeImg from "../assets/quiz-complete.png";

import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

const TIMER = 5000;
function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const userQuestionIndex = userAnswers.length;
  const isComplete = userQuestionIndex == QUESTIONS.length;

  // callBack:dependency array is empty ([]). This means handleUserAnswer will only be 'created' once
  const handleUserAnswer = useCallback(function handleUserAnswer(
    selectedAnswer
  ) {
    setUserAnswers((current) => {
      return [...current, selectedAnswer];
    });
  },
  []);

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

  // grab the current answers index of user:
  const shuffledAnswers = [...QUESTIONS[userQuestionIndex].answers];
  // shuffle the answers by: if( - => first,second) & if(+ => second,first):
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        {/* every new key <=> the component will be re-created again !*/}
        <QuestionTimer
          timer={TIMER}
          onFinish={handleNextQuestion}
          key={userQuestionIndex}
        />
        <h2>{QUESTIONS[userQuestionIndex].text}</h2>
        <ul id="answers">{/* output the questions dynamically */}</ul>
        {shuffledAnswers.map((answer) => (
          <li className="answer" key={answer}>
            <button onClick={() => handleUserAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </div>
    </div>
  );
}
export default Quiz;
