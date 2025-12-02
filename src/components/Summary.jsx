import completeImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null); // get all answers with 'null'
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0] // get all answers that correct
  );

  const skippedAnswersPercentage = Math.floor(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  const correctAnswersPercentage = Math.floor(
    (correctAnswers.length / userAnswers.length) * 100
  );

  const wrongAnswersPercentage =
    100 - skippedAnswersPercentage - correctAnswersPercentage;

  return (
    <div id="summary">
      <img src={completeImg} alt="quiz completion" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersPercentage}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersPercentage}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersPercentage}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer wrong";
          if (answer === null) {
            cssClass = "user-answer skipped";
          } else if (QUESTIONS[index].answers[0] === answer) {
            cssClass = "user-answer correct";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>
                {answer ?? "no answer has been chosen"}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
