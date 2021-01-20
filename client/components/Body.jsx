import React from 'react';
import Question from './Question.jsx'
import './styles/Body.css';

let Body = function(props) {

  return (
    <ul className="list">
      {props.questions.map((question, index) => {
        return (
          <Question key={index} question={question.question} user={question.user} dateAsked={question.askedAt} questionsId={question.questions_id} answers={question.answers}/>
        )
      })}
    </ul>
  )

}

export default Body;