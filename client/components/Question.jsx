import React from 'react';
import './styles/Question.css';
import moment from 'moment';
import axios from 'axios';
import ReactModal from 'react-modal';
import Answers from './Answers.jsx';
import Answer from './Answer.jsx';

ReactModal.setAppElement('#app');

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      votes: 0,
      answers: 0,
      answerDisplay: '',
      downVotes: 0,
      highlight: false,
      loading: false
    }

    this.countAnswers = this.countAnswers.bind(this);
    this.upVotes = this.upVotes.bind(this);
    this.downVotes = this.downVotes.bind(this);
    this.popQuestion = this.popQuestion.bind(this);
  }


  countAnswers(array) {
    this.setState({answers: array.length}, () => {
      if (array.length > 1) {
        this.setState({ answerDisplay: 'answers' });
      } else {
        this.setState({ answerDisplay: 'answer' });
      }
    })
  }

  componentDidMount() {
    this.countAnswers(this.props.answers);
    this.setState({ votes: this.props.answers[0].upvotes })
  }

  popQuestion(e) {
    e.preventDefault();
    if (this.state.highlight) {
      this.setState({highlight: false})
    } else {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState({ loading: false, highlight: true })
        }, 1000)
      })
    }
  }

  upVotes() {
    axios.put('/' + this.props.answers[0].id)
      .then(() => {
        this.setState({ votes: this.state.votes + 1 })
      })
  }

  downVotes() {
    this.setState({ downVotes: this.state.downVotes + 1 })
  }

  render() {
    return (
      <>
      <ReactModal className="spinner" isOpen={this.state.loading} contentLabel="spinner"></ReactModal>
      <li className="item">
        <div className="content-header">
          <div className="left-content">
            <div className="user-and-time">
              <span className="user">{this.props.user}</span>
              <span className="dot">&#8226;</span>
              <span className="time">{moment(this.props.dateAsked).fromNow()}</span>
            </div>
            <div className="question">
              <h3><a href="#" onClick={this.popQuestion}>{this.props.question}</a></h3>
            </div>
          </div>
          <div className="right-content">
            <span>{this.state.answers}</span>
            <span className="ten-font">{this.state.answerDisplay}</span>
          </div>
        </div>
          <div className="button-answer">
            <button onClick={this.popQuestion} type="button">Answer the question</button>
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
            <button type="button" onClick={this.upVotes}>Yes &#8226; {' '}{this.state.votes}</button>
            <button type="button" onClick={this.downVotes}>No &#8226; {' '}{this.state.downVotes}</button>
            <button type="button">Report as inappropriate</button>
          </div>
        </div>
      </li>
      <ReactModal questionId={this.props.questionId} className="my-modal" isOpen={this.state.highlight}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="left-header">
              <span className="ask-display">Post Answer</span>
            </div>
            <div className="right-header">
              <button onClick={this.popQuestion} type="button" className="x-button">
                <span className="x">x</span>
              </button>
            </div>
          </div>
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
              <span className="ten-font">{this.state.answerDisplay}</span>
            </div>
          </div>
          {this.props.answers.map((answer, index) => {
            return (
              <Answers votes={answer.upvotes} upVote={this.upVotes} downVote={this.downVotes} downVotes={this.state.downVotes} answer={answer} key={index} />
            )
          })}
        </li>
        <Answer questionId={this.props.questionId}/>
      </div>
      </ReactModal>
      </>
    )
  }

}

export default Question;

          // <div className="answer-container">
          //   <div className="answer-content">
          //     <span className="user">{this.props.answers[0].user_name}</span>
          //     <span className="dot">&#8226;</span>
          //     <span className="time">{moment(this.props.answers[0].answered_at).fromNow()}</span>
          //   </div>
          //   <div className="answer">
          //     <span>{this.props.answers[0].answer}</span>
          //   </div>
          //   <div className="helpful">
          //     <span className="ten-font">Helpful?</span>
          //     <button type="button" onClick={this.upVotes}>Yes &#8226; {' '}{this.state.votes}</button>
          //     <button type="button" onClick={this.downVotes}>No &#8226; {' '}{this.state.downVotes}</button>
          //     <button type="button">Report as inappropriate</button>
          //   </div>
          // </div>