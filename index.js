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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Middleware to handle asynchronous operations and errors
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

apiRouter.get('/leaderboard', asyncMiddleware(async (req, res) => {
    console.log("Sending leaderboard");
    // Your code to handle leaderboard retrieval
}));

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

apiRouter.post('/leaderboard', asyncMiddleware(async (req, res) => {
    console.log("Updating leaderboard");
    // Your code to handle updating the leaderboard
}));

// Serve index.html for all other routes
app.use((_req, res) => {
    res.sendFile("index.html", { root: 'public' });
});

// Start the server and listen for incoming requests
const server = app.listen(port, async () => {
    try {
        console.log(`Listening on port ${port}`);
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
});

// Keep the event loop active until the server is manually closed
process.on('SIGINT', () => {
    console.log('Shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});