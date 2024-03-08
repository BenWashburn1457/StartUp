const express = require('express')
const app = express();

const port = process.argv.length > 2 ? process.argv[2] :3000

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/leaderboard', (req, res) => {
  console.log("sending leaderboard")
  res.send(leaderboard);
})

apiRouter.post('/leaderboard', (req, res) => {
  leaderboard = updateLeaderboard(req.body, leaderboard);
  res.send(leaderboard);
})


app.use((_req, res) => {res.sendFile("index.html", { root: 'public' });});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let leaderboard = [];

function updateLeaderboard(newScore, leaderboard){
  let record = false;
  for (const [i, prevScore] of leaderboard.entries()) {
    if (newScore.score > prevScore.score) {
      leaderboard.splice(i,0, newScore)
      record = true;
      break;
    }
  }

  if (!record){leaderboard.push(newScore)}

  if (leaderboard.length > 10) {leaderboard.length = 10;}

  return leaderboard;
}