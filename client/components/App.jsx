import React from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Ask from './Ask.jsx';
import './styles/App.css';
import ReactModal from 'react-modal';

const server = 'http://localhost:4000';

ReactModal.setAppElement('#app');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: 20,
      questions: [],
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
    this.sortByNewest = this.sortByNewest.bind(this);
    this.changeToNumber = this.changeToNumber.bind(this);
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

  componentDidMount() {
    axios.get(server + '/' + this.state.product)
      .then((response) => {
        this.loadQuestions(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
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

  loadQuestions(data) {
    this.setState({
      questions: data
    }, () => {
      let newData = this.sortByNewest(this.state.questions);
      this.setState({ questions: newData })
    })
  }


  render() {
    if (!this.state.asking) {
      return (
        <div className="main-container" ref={this.focusOnCancel}>
           <ReactModal className="asked" isOpen={this.state.asked}>
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
          <Header askQuestion={this.askQuestion} length={this.state.questions.length}/>
          <Body questions={this.state.questions} isSorting={this.state.sorting}/>
        </div>
      )
    } else {
      return (
        <div className="main-container">
          <Header askQuestion={this.askQuestion} length={this.state.questions.length}/>
          <Body questions={this.state.questions} />
          <ReactModal className="spinner" isOpen={this.state.loading} contentLabel="spinner"></ReactModal>
          <div ref={this.myDivToFocus}>
            <Ask product={this.state.product} cancel={this.cancelQuestion} asked={this.askedQuestion}/>
          </div>
        </div>
      )
    }
  }
}

export default App;