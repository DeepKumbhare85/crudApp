const express= require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/crud').then(() => {
    console.log('successfully connected to MongoDB')
})

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const userModel = mongoose.model("users", userSchema)
const port = 3000

app.get('/getUsers', (req, res) => {
    userModel.find({}).then((users)=> {
        res.json(users)
    })
    .catch(err => {
        console.error(err)
    })
})

app.post('/addUser', (req, res) => {
    console.log(req.body)

    userModel.create(req.body)
    res.send('done')
})

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
    console.log(`listening on https://localhost:${port}`)
})