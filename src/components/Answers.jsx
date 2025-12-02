import { useRef } from "react";

function Answers({ answers, selectedAnswer, answerState, onSelect }) {

  const shuffledAnswers = useRef();

  if (shuffledAnswers.current === undefined) {
    // grab the current answers index of user:
    shuffledAnswers.current = [...answers];
    // shuffle the answers by: if( - => first,second) & if(+ => second,first):
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssStyle = "";

        if (answerState === "answered" && isSelected) {
          cssStyle = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssStyle = answerState;
        }
        return (
          <li className="answer" key={answer}>
            <button
              disabled={answerState !== ''}
              className={cssStyle}
              onClick={() => onSelect(answer)}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
