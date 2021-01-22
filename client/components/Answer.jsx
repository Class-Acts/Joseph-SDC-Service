import React from 'react';
import moment from 'moment';
import axios from 'axios';
import './styles/Answer.css';

class Answer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: '',
      answeredAt: '',
      checkbox: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
      answeredAt: moment().format()
    })
  }

  handleClick() {

  }


  render() {
    return (
      <div className="answer-container">
        <div className="required">Required fields are marked with *</div>
        <div className="answer-me">
          <span>Answer*</span>
        </div>
        <div className="answer-area">
          <textarea onChange={this.handleInputChange} className="answer-input" type="text" placeholder="Answer the question..." name="answer"></textarea>
        </div>
        <div className="checkbox-head">
            <div className="row-center">
              <input onChange={this.handleInputChange} type="checkbox" id="checkbox" name="checkbox" className="checked"></input>
              <label className="checkbox-label">I agree to the <u>terms and conditions</u></label>
            </div>
            <div>
              <span className="required">You may receive emails regarding this submission. Any emails will include the ability to opt out of future communications.</span>
            </div>
            <div className="button-container">
              <button onClick={this.handleClick} className="green-button">Post answer</button>
            </div>
        </div>

      </div>
    )
  }
}

export default Answer;