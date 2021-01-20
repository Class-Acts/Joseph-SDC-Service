import React from 'react';
import $ from 'jquery';

const server = 'http://localhost:4000/questions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }

    this.loadQuestions = this.loadQuestions.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: server,
      type: 'GET',
      success: (data) => {
        this.loadQuestions(data);
      },
      error: (error) => {
        debugger;
        console.log('error on get request: ' + error);
      }
    })
  }

  loadQuestions(response) {
    this.setState = {
      questions: response
    }
  }


  render() {
    return (
     <h1>Hello World!</h1>
    )
  }
 // test
}

export default App;