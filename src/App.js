import './App.css';
import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

const SAVE_QUOTES = "SAVE_QUOTES";
const SET_CURRENT_QUOTE = "SET_CURRENT_QUOTE";

const saveQuotes = (quotes) => {
  return {
    type: SAVE_QUOTES,
    quotes: quotes
  };
};

const setCurrentQuote = (quote) => {
  return {
    type: SET_CURRENT_QUOTE,
    quote: quote
  };
};

const initialState = {
  quotes: [],
  currentQuote: {
    quote: "Be unique, this matters",
    author: "Galina Karateeva"
  }
};

const quotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_QUOTES:
      return {
        quotes: action.quotes,
        currentQuote: state.currentQuote
      };
    case SET_CURRENT_QUOTE:
      return {
        quotes: state.quotes,
        currentQuote: action.quote
      };
    default:
      return state;
  }
};

const store = Redux.createStore(quotesReducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(response => response.json())
      .then(data => data.quotes)
      .then(quotes => this.props.saveQuotes(quotes));
  }

  getNewQuote() {
    let quotes = this.props.quotes;
    if (quotes.length !== 0) {
      let randomNumber = Math.floor(Math.random() * quotes.length);
      let randomQuote = quotes[randomNumber];
      this.props.setCurrentQuote(randomQuote);
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div id="main" className="border p-3">
          <h1 className="text-info text-center" id="heading">
            Here is your daily quote:
          </h1>
          <div id="quote-box" className="text-center">
            <Quote currentQuote={this.props.currentQuote}/>
            <div className="row">
              <div className="col-md-1 button">
                <a
                  className="btn btn-info"
                  id="tweet-quote"
                  title="Twit it!"
                  target="_blank"
                  href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + this.props.currentQuote.quote + '" ' + this.props.currentQuote.author)}
                >
                  <i className="fa fa-twitter"/>
                </a>
              </div>

              <div className="col-md-10 text-right button">
                <button
                  className="btn btn-info"
                  id="new-quote"
                  onClick={this.getNewQuote}
                >
                  New Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="quote-text">
          <i className="fa fa-quote-left"/>
          <span id="text">{this.props.currentQuote.quote}</span>
          <i className="fa fa-quote-right"/>
        </div>
        <div className="quote-author">
          <span id="author">- {this.props.currentQuote.author}</span>
        </div>
      </div>
    );
  }
}

const Provider = ReactRedux.Provider;

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes,
    currentQuote: state.currentQuote
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuotes: function (quotes) {
      dispatch(saveQuotes(quotes));
    },
    setCurrentQuote: function (quote) {
      dispatch(setCurrentQuote(quote))
    }
  };
};

const connect = ReactRedux.connect;
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    );
  }
}

export default AppWrapper;
