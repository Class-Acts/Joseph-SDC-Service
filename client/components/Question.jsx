import React from 'react';
import './styles/Question.css';
import moment from 'moment';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      votes: 0,
      answers: 0
    }

    this.countAnswers = this.countAnswers.bind(this);
  }

  countAnswers(array) {
    this.setState({answers: array.length})
  }

  componentDidMount() {
    this.countAnswers(this.props.answers);
  }

  render() {
    return (
      <li className="item">
        <div className="content-header">
          <div className="left-content">
            <div className="user-and-time">
              <span className="user">{this.props.user}</span>
              <span className="dot">&#8226;</span>
              <span className="time">{moment(this.props.dateAsked).fromNow()}</span>
            </div>
            <div className="question">
              <h3>{this.props.question}</h3>
            </div>
          </div>
          <div className="right-content">
            <span>{this.state.answers}</span>
            <span className="ten-font">answers</span>
          </div>
        </div>
          <div className="button-answer">
            <button type="button">Answer the question</button>
          </div>
        <div className="answer-container">
          <div className="answer-content">
            <span className="user">{this.props.answers[0].user_name}</span>
            <span className="dot">&#8226;</span>
            <span className="time">{moment(this.props.answers[0].answered_at).fromNow()}</span>
          </div>
          <div className="answer">
            <span>{this.props.answers[0].answer}</span>
          </div>
          <div className="helpful">
            <span className="ten-font">Helpful?</span>
            <button type="button">Yes &#8226; {' '}{this.props.answers[0].upvotes}</button>
            <button type="button">No &#8226; 0</button>
            <button type="button">Report as inappropriate</button>

          </div>
        </div>
      </li>
    )
  }

}

export default Question;