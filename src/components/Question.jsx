import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from '../questions.js';

import { useState } from "react";

function Question({onSelectAnswer,handleNextQuestion,questionIndex}) {

  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  })

  let timer = 5000
  if(answer.selectedAnswer){
    timer = 1000;
  }

  if(answer.isCorrect != null){
    timer = 2000;
  }

  const handleSelectAnswer = (answer) =>{
    // answer selected => jump to line 30, and make localVariable wrong.
    // again after 1 sec => jump to line 30 , and make change localVariable depend on answer.
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    })
    setTimeout(() =>{
      setAnswer({
      selectedAnswer: answer,
      isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
    })

    setTimeout(() =>{
      onSelectAnswer(answer);
    },2000)
    },1000)
  }

  let answerState = '';
  if(answer.selectedAnswer && answer.isCorrect != null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  }else if(answer.selectedAnswer) {
    answerState = 'answered';
  }


  return (
    <div id="question"> 
      {/* every new key <=> the component will be re-created again !*/}
      <QuestionTimer
        timer={timer}
        onFinish={answer.selectedAnswer === ''? handleNextQuestion : null}
        mode={answerState}
        key={timer}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

export default Question;
