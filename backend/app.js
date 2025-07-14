const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
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
app.use('/api', venueRoutes);
app.use('/api', bookingRoutes);


app.use(errorHandler)


module.exports = app;
