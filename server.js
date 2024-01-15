const express= require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

// parse json data
app.use(bodyParser.json())

// parse form data
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')));

// connect to mongodb using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/crud').then(() => {
    console.log('successfully connected to MongoDB')
})

// schema of user model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const userModel = mongoose.model("users", userSchema)
const port = 3000

// For getting users
app.get('/getUsers', (req, res) => {
    userModel.find({}).then((users)=> {
        res.json(users)
    })
    .catch(err => {
        console.error(err)
    })
})


// Edit user
app.put('/editUser/:id', (req, res) => {
    
})


// Add user
app.post('/addUser', (req, res) => {
    const response = userModel.create(req.body)
    res.redirect('/')
})

// delete user
app.delete('/deleteUser/:id',async (req,res)=> {
    console.log(req.params.id)
    const response =  await userModel.deleteOne({_id: req.params.id})
    res.send(JSON.stringify(response))
})

// handle index file.
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// listening to server at 3000 port
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})