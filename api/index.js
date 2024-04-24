const express = require('express');
const app = express();
require('dotenv').config()

app.use(express.json());

//text-only route
const text_route = require('./routes/text-route')
app.use('/generate', text_route);


//running server
app.listen(process.env.PORT, ()=>{
  console.log(process.env.PORT)
    console.log(`Backend running on port ${process.env.PORT}`);
})