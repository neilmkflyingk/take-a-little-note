// dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// express creates a route for every file in the 'public' folder
app.use(express.static('public'));
// express to handle data parse and middle wear created req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// starts server
app.listen(PORT, () => {
  console.log(`Server available at localhost${PORT}`);
});