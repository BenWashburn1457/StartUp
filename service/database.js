const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const uri = "mongodb+srv://benwashburn:Benny-boy%231457@startupdata.pioirt1.mongodb.net/?retryWrites=true&w=majority&appName=startupdata";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = client.db('2048');
const users = db.collection('users');
const scores = db.collection('scores')

function getUser(userName) {
  return users.findOne({ userName: userName });
}

function getUserByToken(token) {
  return users.findOne({ token: token })
}

async function createUser(userName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: userName,
    password: passwordHash,
    token: uuid.v4(),
  };
  await users.insertOne(user);

  return user;
}

async function verifyLogin(userName, password) {
  const user = await getUser(userName);
  if(!user) {
    return false;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if(passwordMatch) {
    return user;
  }
  return false;
}

async function updateHighScores(userName, score, date) {
  const highScore = {
    userName: userName,
    score: score,
    date: date,
  };

  await scores.insertOne(highScore);
}

async function getHighScores() {
    const query = { score: {$gt: 0, $lt: 5000} };
    const options = {
      sort: { score : -1},
      limit: 6,
    };
    const cursor = await scores.find(query, options);
    return cursor.toArray();
}

module.exports = {
  getUser,
  createUser,
  verifyLogin,
  getHighScores,
  updateHighScores,
  getUserByToken
};