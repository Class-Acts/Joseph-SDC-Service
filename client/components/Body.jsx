import React from 'react';
import Question from './Question.jsx'
import './styles/Body.css';

let Body = function(props) {


  return (
    <ul className="list">
      {props.questions.map((question, index) => {
        return (
          <Question key={index} question={question.question} user={question.user} dateAsked={question.asked_at} questionId={question.questionId} answers={question.answers}/>
        )
      })}
    </ul>
  )
}

export default Body;