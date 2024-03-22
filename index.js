const express = require('express');
const cookieParser = require('cookie-parser');
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

apiRouter.post('/clear/cookie', (req, res) => {
    console.log('clearing cookie')
    res.cookie('token', '', { expires: new Date(0) });
    res.status(200).send({ message: 'Cookie cleared successfully' });
})

apiRouter.post('/auth/create', asyncMiddleware(async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ msg: 'Username and password are required' });
        }

        if (await DB.getUser(userName)) {
            return res.status(409).json({ msg: 'User already exists' });
        }

        const user = await DB.createUser(userName, password);
        const authToken = user.token;

        res.cookie('token', authToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        }).json({ id: user.token });
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}));

apiRouter.post('/auth/login', asyncMiddleware(async (req, res) => {
  console.log("recieved login info")
  const {userName, password} = req.body;
  if (!userName || !password) {
    return res.status(400).json({ msg: 'Username and password are required' });
  }
  let user = await DB.verifyLogin(userName, password);
  if(user){
    res.cookie('token', user.token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    }).json({ id: user.token });
  } else {
    res.status(401).json({msg: 'Invalid username or password'});
  }
  
}));

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies['token'];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
      
    }
});

secureApiRouter.get('/play', asyncMiddleware(async (req, res) => {
    console.log("verified");
}));

secureApiRouter.post('/update/leaderboard', asyncMiddleware(async (req, res) => {
    console.log("Updating leaderboard");
    const {userName, score, date} = req.body;
    await DB.updateHighScores(userName, score, date);
}));


secureApiRouter.get('/leaderboard', asyncMiddleware(async (req, res) => {
    console.log("Sending leaderboard");
    
    const scores = await DB.getHighScores();
    res.send(scores);
}));

app.use((_req, res) => {
    res.sendFile("index.html", { root: 'public' });
});

const server = app.listen(port, async () => {
    try {
        console.log(`Listening on port ${port}`);
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
});

process.on('SIGINT', () => {
    console.log('Shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});