const express = require('express')
const app = express();

const port = process.argv.length > 2 ? process.argv[2] :3000

app.use(express.json());

app.use(express.static('public '));

var apiRouter = express.Router();
app.use('/api', apiRouter);


const path = require('path');
app.use((_req, res) => {
    const requestedFile = _req.path;
    const fileExtension = path.extname(requestedFile);
    const fileName = fileExtension ? requestedFile : 'index.html';
    res.sendFile(fileName, { root: 'public' });

  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });