import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    getQuote();
  })

  React.useEffect(() => {
    fetch('/api/scores')
      .then(response => {
        if (response.status === 401) {
          console.log('Unauthorized access detected. Redirecting to login page.');
          localStorage.setItem('logout', true);
          window.location.href = '/login'; // Redirect to login page
          throw new Error('Unauthorized'); // Throwing an error to skip further .then() blocks
        }
        return response.json(); // Continue processing the response
      })
      .then(scores => {
        // This block will only be executed if the response status is not 401
        setScores(scores);
        localStorage.setItem('scores', JSON.stringify(scores));
      })
      .catch(error => {
        // Handle any errors, such as network issues or parsing errors
        console.error('Error fetching scores:', error);
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);
  

  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{score.userName}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  async function getQuote() {
    let quote = ''
    try {
        
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=success', {
            headers: {
                'X-Api-Key' : '5eUfhqL4ee9xih8bKX96MuNBkps0cJG74Xt6b4vC'
            }
        });
        quote = await response.json();
        

    } catch {
        quote = "After all that has been said, there is no avoiding the poop corn"
    }

    displayQuote(quote)
}

function displayQuote(quote) {
  let quoteText = quote['0']['quote'];
  let quoteAuthor = quote['0']['author'];
  let quoteContainer = document.querySelector('#quoteContainer');
  let authorContainer = document.querySelector('#authorContainer');
  quoteContainer.textContent = quoteText;
  authorContainer.textContent = quoteAuthor;
  console.log(quote)
}

  return (
    <div className='leaderboards'>
      <table className='scores'>
        <tbody id='scores'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
          {scoreRows}
        </tbody>
      </table>
      <div id="inspiration">
          <h4 id='quoteContainer'>Inspirational quote</h4>
          <h5 id="authorContainer">Author</h5>
      </div>
    </div>
  );
}
