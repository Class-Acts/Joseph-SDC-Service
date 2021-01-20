import React from 'react';
import './styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: ''
    };
  }

  render() {
    return (
      <div className="header">
        <h2 className="QnA">Questions & Answers</h2>
        <div className="ask">
          <button onClick={(e) => {e.preventDefault(); this.props.askQuestion()}} className="askHere green-button" type="button">Ask a question</button>
        </div>
        <div className="bottomRow">
          <span className="showing">1 - 3 of{' '}{this.props.length}{' '}Questions</span>
          <div className="sort">
            <span className="sortMe">Sort by: </span>
            <button className="sortBy" type="button">Newest Question</button>
            <span className="arrow-down"></span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;