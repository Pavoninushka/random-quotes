import './App.css';
import React, { useState, useEffect } from 'react';

const initialQuote = {
  quote: "Be unique, this matters",
  author: "Galina Karateeva"
};

const App = () => {
  const [currentQuote, setCurrentQuote] = useState(initialQuote);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(response => response.json())
      .then(data => data.quotes)
      .then(quotes => setQuotes(quotes));
  }, []);

  function getNewQuote() {
    if (quotes.length !== 0) {
      let randomNumber = Math.floor(Math.random() * quotes.length);
      let randomQuote = quotes[randomNumber];
      setCurrentQuote(randomQuote);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div id="main" className="border p-3">
        <h1 className="text-info text-center" id="heading">
          Here is your daily quote:
        </h1>
        <div id="quote-box" className="text-center">
          <Quote currentQuote={currentQuote}/>
          <div className="row">
            <div className="col-md-1 button">
              <a
                className="btn btn-info"
                id="tweet-quote"
                title="Twit it!"
                target="_blank"
                href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + currentQuote.quote + '" ' + currentQuote.author)}
              >
                <i className="fa fa-twitter"/>
              </a>
            </div>

            <div className="col-md-10 text-right button">
              <button
                className="btn btn-info"
                id="new-quote"
                onClick={getNewQuote}
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

const Quote = (props) => {
  return (
    <div>
      <div className="quote-text">
        <i className="fa fa-quote-left"/>
        <span id="text">{props.currentQuote.quote}</span>
        <i className="fa fa-quote-right"/>
      </div>
      <div className="quote-author">
        <span id="author">- {props.currentQuote.author}</span>
      </div>
    </div>
  );
};

export default App;