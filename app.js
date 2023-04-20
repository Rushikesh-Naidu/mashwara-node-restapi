const express = require('express');
const app = express();

// Routes
app.get('/customer',(req,res)=>{
    res.send("Customer API is created successfully...!")
})


// APP Listener
app.listen(1206, ()=>{
    console.log("API is up and running on port 1206");
})
