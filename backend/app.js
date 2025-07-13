const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors(
    {
        origin : true,
        credentials : true
    }
));

app.use(express.json());
app.use(cookieParser());

// Home route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
