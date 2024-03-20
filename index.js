const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();
const bcrypt = require('bcrypt');
const port = process.argv.length > 2 ? process.argv[2] :3000
const DB = require('./database.js');

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/leaderboard', (req, res) => {
  console.log("sending leaderboard")
  res.send(leaderboard);
})

apiRouter.post('auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({msg: 'Existing User'});
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
})

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

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

  if (leaderboard.length > 7) {leaderboard.length = 7;}

  return leaderboard;
}