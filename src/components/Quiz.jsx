import { useState } from "react";
import QUESTIONS from "../questions.js";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const userQuestionIndex = userAnswers.length;

  function handleUserAnswer(selectedAnswer) {
    setUserAnswers((current) => {
      return [...current, selectedAnswer];
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[userQuestionIndex].text}</h2>
        <ul id="answers">{/* output the questions dynamically */}</ul>
        {QUESTIONS[userQuestionIndex].answers.map((answer) => (
          <li className="answer" key={answer}>
            <button onClick={() => handleUserAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
