const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customerModel')
const app = express();

app.use(express.json());

// Routes
// GET
// Get All Customers
app.get('/', (req,res)=>{
    res.send("If you are seeing this then github push is getting updated automatically")
})

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/customers',async(req,res)=>{ 
    try {
        const customer = await Customer.find()
        res.status(200).json(customer)
    } catch (error) {
        res.status(error.status).json({message:error.message})
    }
})

// Get Customer By Customer Phone Number
app.get('/customers/custPhone',async(req,res)=>{ 
    try {
        const phone = req.query.phoneNumber;
        const customer = await Customer.find({"phoneNumber": phone})
        res.status(200).json(customer)
    } catch (error) {
        res.status(error.status).json({message:error.message})
    }
})

// Get Customer By Customer ID
app.get('/customers/:id',async(req,res)=>{ 
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id)
        res.status(200).json(customer)
    } catch (error) {
        res.status(error.status).json({message:error.message})
    }
})
// End of GET api

// POST
app.post('/customers', async(req,res)=>{
    try {
        const customer = await Customer.create(req.body)
        res.status(201).json(customer);
    } catch (error) {
        res.status(error.status).json({message: error.message})
    }
})
// End of POST api

// PUT
app.put('/customers/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const customer = await Customer.findByIdAndUpdate(id, req.body);
        if(!customer){
            return res.status(404).json({message: `Can not find customer with id ${id}...!`})
        }
        const updatedCustomer = await Customer.findById(id);
        res.status(201).json(updatedCustomer);

    } catch (error) {
        res.status(error.status).json({message: error.message})
    }
})
// End Of PUT api

// DELETE
app.delete('/customers/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const customer = await Customer.findByIdAndDelete(id);
        if(!customer){
            return res.status(404).json({message : `Can not find customer with id ${id}...!`});
        }
        res.status(201).json(customer);
    } catch (error) {
        res.status(error.status).json({message: error.message})
    }
})
// End of DELETE api


// APP Listener
app.listen(1206, ()=>{
    console.log("API is up and running on port 1206");
})
mongoose
.connect('mongodb+srv://rushikesh:doUbiNN8hucvP0yl@mashwara-backend.m54tzni.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to database");
})
.catch((error)=>{
    console.log(error);
})