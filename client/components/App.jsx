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
    }

    this.myDivToFocus = React.createRef();
    this.loadQuestions = this.loadQuestions.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
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




  componentDidMount() {
    axios.get(server + '/' + this.state.product)
      .then((response) => {
        console.log(response);
        this.loadQuestions(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  loadQuestions(data) {
    this.setState({
      questions: data
    })
  }


  render() {
    if (!this.state.asking) {
      return (
        <div className="main-container">
          <Header askQuestion={this.askQuestion} length={this.state.questions.length}/>
          <Body questions={this.state.questions} />
        </div>
      )
    } else {
      return (
        <div className="main-container">
          <Header askQuestion={this.askQuestion} length={this.state.questions.length}/>
          <Body questions={this.state.questions} />
          <ReactModal className="spinner" isOpen={this.state.loading} contentLabel="spinner">
            {/* <div className="spinner">Hey</div> */}
          </ReactModal>
          <div ref={this.myDivToFocus}>
            <Ask product={this.state.product}/>
          </div>
        </div>
      )
    }
  }
}

export default App;