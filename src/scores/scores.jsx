import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

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

  return (
    <div className='leaderboards'>
      <table className='scores'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        <tbody id='scores'>{scoreRows}</tbody>
      </table>
    </div>
  );
}
