const express = require('express');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express();


app.use('/api', require('./routes'));


app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));