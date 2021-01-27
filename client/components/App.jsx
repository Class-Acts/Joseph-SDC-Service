import React from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Ask from './Ask.jsx';
import './styles/App.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

const customModalStyles = {
  overlay: {zIndex: 1000}
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: 20,
      questions: [],
      sortedBy: 'Newest questions',
      asking: false,
      loading: false,
      asked: false,
    }

    this.myDivToFocus = React.createRef();
    this.focusOnCancel = React.createRef();
    this.loadQuestions = this.loadQuestions.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
    this.cancelQuestion = this.cancelQuestion.bind(this);
    this.wasAsked = this.wasAsked.bind(this);
    this.askedQuestion = this.askedQuestion.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.changeToNumber = this.changeToNumber.bind(this);
    this.sortByNewest = this.sortByNewest.bind(this);
    this.sortByMostAnswered = this.sortByMostAnswered.bind(this);
    this.sortByNewest = this.sortByNewest.bind(this);
    this.sortByMostHelpfulAnswers = this.sortByMostHelpfulAnswers.bind(this);
    this.sortByAnswersNeeded = this.sortByAnswersNeeded.bind(this);
    this.sortByNewestAnswers = this.sortByNewestAnswers.bind(this);
    this.sortAllQuestions = this.sortAllQuestions.bind(this);
  }

  sortByNewest(array) {
    array.sort((a, b) => {
      let newA = this.changeToNumber(a.asked_at);
      let newB = this.changeToNumber(b.asked_at);
      return newB - newA;
    })
    return array;
  }

  sortByMostAnswered(array) {
    let sorted = array.sort((a, b) => {
      return b.answers.length - a.answers.length;
    })
    return sorted;
  }

  sortByNewestAnswers(array) {
    let sorted = array.sort((a, b) => {
      let newA = this.changeToNumber(a.answers[0].answered_at);
      let newB = this.changeToNumber(b.answers[0].answered_at);
      return newB - newA;
    })
    return sorted;
  }

  sortByAnswersNeeded(array) {
    let sorted = array.sort((a, b) => {
      return a.answers.length = b.answers.length;
    })
    return sorted;
  }

  sortByMostHelpfulAnswers(array) {
    let sorted = array.sort((a, b) => {
      return b.answers[0].upvotes - a.answers[0].upvotes;
    })
    return sorted;
  }

  sortAllQuestions() {
    if (this.state.sortedBy === 'Newest questions') {
      let newQuestions = this.sortByNewest(this.state.questions);
      this.setState({questions: newQuestions});
    } else if (this.state.sortedBy === 'Most answered') {
      let newQuestions = this.sortByMostAnswered(this.state.questions);
      this.setState({questions: newQuestions});
    } else if (this.state.sortedBy === 'Newest answers') {
      let newQuestions = this.sortByNewestAnswers(this.state.questions);
      this.setState({questions: newQuestions});
    } else if (this.state.sortedBy === 'Answers needed') {
      let newQuestions = this.sortByAnswersNeeded(this.state.questions);
      this.setState({questions: newQuestions});
    } else {
      let newQuestions = this.sortByMostHelpfulAnswers(this.state.questions);
      this.setState({questions: newQuestions});
    }
  }


  loadQuestions(data) {
    let newData = this.sortByNewest(data);
    this.setState({
      questions: newData
    })
  }

  componentDidMount() {
    axios.get('http://localhost:4000/' + this.state.product)
      .then((response) => {
        this.loadQuestions(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  askQuestion() {
    this.setState({asking: true, loading: true}, () => {
      setTimeout(() => {
        this.setState({loading: false})
        this.myDivToFocus.current.scrollIntoView({
          behavior: "smooth",
        });
      }, 2000)
    })
  }

  cancelQuestion() {
    this.setState({asking: false}, () => {
      this.focusOnCancel.current.scrollIntoView({
        behavior: 'smooth'
      })
    });
  }

  askedQuestion() {
    this.setState({asking: false}, () => {
      this.focusOnCancel.current.scrollIntoView({
        behavior: 'smooth'
      });
      this.setState({ asked: true }, () => {
        this.componentDidMount();
      })
    })
  }

  wasAsked() {
    this.setState({ asked: false });
  }

  sortBy(input) {
    this.setState({ sortedBy: input }, () => {
      this.sortAllQuestions();
    });
  }

  changeToNumber(str) {
    let re = /-/gi;
    let reg = /:/gi;
    let regex = /T/gi;
    let tempA = str.replace(re, '');
    tempA = tempA.replace(reg, '');
    tempA = tempA.replace(regex, '');
    tempA = parseInt(tempA, 10);
    return tempA;
  }

  sortByNewest(array) {
    array.sort((a, b) => {
      let newA = this.changeToNumber(a.asked_at);
      let newB = this.changeToNumber(b.asked_at);
      return newB - newA;
    })
    return array;
  }

  render() {
    if (!this.state.asking) {
      return (
        <div className="main-container" ref={this.focusOnCancel}>
           <ReactModal className="asked" isOpen={this.state.asked} style={customModalStyles}>
             <div className="submit-modal">
              <div className="check-container">
                <button onClick={this.wasAsked} type="button" className="x-button">
                  <span className="x">x</span>
                </button>
              </div>
              <div className="image-container">
                <div>
                  <img className="checkbox-green" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfgg_Ow5Vww9CgzIezCKmTt0wa5up2ole-gNKcPlMGwHIcVV8&s" alt="green check mark"></img>
                </div>
                <div>
                  <span>Your question was submitted!</span>
                </div>
              </div>
            </div>
          </ReactModal>
          <Header askQuestion={this.askQuestion} length={this.state.questions.length} sortBy={this.sortBy} sortedBy={this.state.sortedBy}/>
          <Body questions={this.state.questions} changeNumber={this.changeToNumber}/>
        </div>
      )
    } else {
      return (
        <div className="main-container">
          <Header askQuestion={this.askQuestion} length={this.state.questions.length}/>
          <Body questions={this.state.questions} sortedBy={this.state.sortedBy} changeNumber={this.changeNumber}/>
          <ReactModal className="spinner" isOpen={this.state.loading} contentLabel="spinner" style={customModalStyles}></ReactModal>
          <div ref={this.myDivToFocus}>
            <Ask product={this.state.product} cancel={this.cancelQuestion} asked={this.askedQuestion}/>
          </div>
        </div>
      )
    }
  }
}

export default App;