import React from 'react';
import moment from 'moment';


class Answers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upVotes: this.props.votes,
      downVotes: this.props.downVotes
    }
  }

  render() {
    return (
      <div>
         <div className="answers-container">
          <div className="answer-content">
            <span className="user">{this.props.answer.user_name}</span>
            <span className="dot">&#8226;</span>
            <span className="time">{moment(this.props.answer.answered_at).fromNow()}</span>
          </div>
          <div className="answer">
            <span>{this.props.answer.answer}</span>
          </div>
          <div className="helpful">
            <span className="ten-font">Helpful?</span>
            <button type="button" onClick={() => {this.props.upVote; this.setState({upVotes: this.state.upVotes + 1})}}>Yes &#8226; {' '}{this.state.upVotes}</button>
            <button type="button" onClick={() => {this.props.downVote; this.setState({downVotes: this.state.downVotes + 1})}}>No &#8226; {' '}{this.state.downVotes}</button>
            <button type="button">Report as inappropriate</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Answers;