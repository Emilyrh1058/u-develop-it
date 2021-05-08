const express = require('express');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// USE ROUTES - API
app.use('/api', apiRoutes);


// DEFAULT RESPONSE FOR "NOT FOUND" - CATCHALL
app.use((req, res) => {
  res.status(404).end();
});


// START SERVER AFTER DB CONNECTION
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
