const express = require("express");
const router = require("./api/router");
const PORT = 3000;
const app = express();

// Apply JSON parsing middleware
app.use(express.json());
// Apply router
app.use("/", router);


// Serving app on defined PORT
app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));