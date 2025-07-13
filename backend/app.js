const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
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

app.use('/api/auth', authRoutes);

module.exports = app;
