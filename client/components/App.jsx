import React from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Ask from './Ask.jsx';
import './styles/App.css';

const server = 'http://localhost:4000/20';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
      questions: [],
      asking: false
    }

    this.loadQuestions = this.loadQuestions.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
  }

  askQuestion() {
    this.setState({asking: true});
    console.log('clicked');
  }

  componentDidMount() {
    axios.get(server)
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
          <Header askQuestion={this.askQuestion}length={this.state.questions.length}/>
          <Body questions={this.state.questions} />
        </div>
      )
    } else {
      return (
        <div className="main-container">
          <Header askQuestion={this.askQuestion} length={this.state.questions.length}/>
          <Body questions={this.state.questions} />
          <Ask product={this.state.product}/>
        </div>
      )
    }
  }
}

export default App;