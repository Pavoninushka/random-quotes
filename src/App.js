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
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => data.quotes)
      .then((quotes) => setQuotes(quotes));
  }, []);

  function getNewQuote() {
    if (quotes.length !== 0) {
      let randomNumber = Math.floor(Math.random() * quotes.length);
      let randomQuote = quotes[randomNumber];
      setCurrentQuote(randomQuote);
    }
  }

  return (
    <main className="d-flex justify-content-center align-items-center h-100">
      <div id="main" className="border border-secondary rounded p-3">
        <h1 className="text-primary text-center" id="heading">
          Here is your daily quote:
        </h1>
        <div id="quote-box" className="text-center">
          <Quote currentQuote={currentQuote} />
          <div className="row">
            <div className="col-md-1 button">
              <a
                className="btn btn-primary"
                id="tweet-quote"
                target="_blank"
                href={
                  "https://twitter.com/intent/tweet?text=" +
                  encodeURIComponent(
                    '"' + currentQuote.quote + '" ' + currentQuote.author
                  )
                }
              >
                <i className="fa fa-twitter" /><span className="visually-hidden">Tweet this quote.</span>
              </a>
            </div>

            <div className="col-md-11 button">
              <button
                className="btn btn-primary"
                id="new-quote"
                onClick={getNewQuote}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Quote = (props) => {
  return (
    <figure>
      <blockquote className="quote-text" >
        <i className="fa fa-quote-left" />
        <span id="text">{props.currentQuote.quote}</span>
        <i className="fa fa-quote-right" />
      </blockquote>
      <figcaption id="author">- {props.currentQuote.author}</figcaption>

    </figure>
  );
};

export default App;