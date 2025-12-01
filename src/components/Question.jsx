import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

function Question({questionText,answers,onSelectAnswer, selectedAnswer, answerState,handleNextQuestion}) {
  return (
    <div id="question">
      {/* every new key <=> the component will be re-created again !*/}
      <QuestionTimer
        timer={8000}
        onFinish={handleNextQuestion}
      />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}

export default Question;
