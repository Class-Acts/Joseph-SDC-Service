import React from 'react';
import axios from 'axios';
import moment from 'moment';
import './styles/Ask.css';

class Ask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'you',
      asked_at: '',
      question: '',
      product_id: this.props.product,
      checkbox: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    axios.post('/questions/' + this.state.product_id, this.state)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
      asked_at: moment().format()
    });
  }

  render() {
    return (
      <div className="question-box">
        <header className="question-header border-bottom">
          <div className="left-header">
            <span className="ask-display">Ask a question</span>
            <span className="required-display">Required fields are marked with *</span>
          </div>
          <div className="right-header">
            <button onClick={this.props.cancel} type="button" className="x-button">
              <span className="x">x</span>
            </button>
          </div>
        </header>
        <div className="question-body">
          <div>
            <span className="question-head">Question*</span>
            <span className="chars">Maximum of 255 characters</span>
          </div>
          <div className="border-bottom">
            <textarea onChange={this.handleInputChange} type="text" name="question" className="question-input" placeholder="Ask a question..."></textarea>
          </div>
          <span className="question-head email-head">Email</span>
          <div className="border-bottom">
            <textarea onChange={this.handleInputChange} type="text" name="email" className="email-input" placeholder="Example: yourname@example.com"></textarea>
          </div>
          <div className="checkbox-head">
            <div className="row-center">
              <input onChange={this.handleInputChange} type="checkbox" id="checkbox" name="checkbox" className="checked"></input>
              <label className="checkbox-label">I agree to the <u>terms and conditions</u></label>
            </div>
            <div>
              <span className="small-font margin-left">You may receive emails regarding this submission. Any emails will include the ability to opt out of future communications.</span>
            </div>
            <div className="button-container">
              <button onClick={this.handleClick}className="green-button margin-left">Post question</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Ask;