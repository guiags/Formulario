const express = require('express')
const bodyParser = require('body-parser')
const app= express()

app.use(bodyParser.urlencoded({ extended: true }))


const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://123:123@cluster0.kqfjp.mongodb.net/Formulario?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db= client.db('Formulario')

    app.listen(3000, function(){
        console.log("Server running on port 3000")
    })
})


app.get('/', (req, res)=>{
    res.render("index.ejs")
})

app.set('view engine', 'ejs')

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result)=>{
        if (err) return console.log(err)

        console.log("Salvo no banco de dados")
        res.redirect('/show')
        
    })
})

app.get('/', (req, res)=>{
    let cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.use("/css",express.static(__dirname + "/css"));
app.use("/lib",express.static(__dirname + "/lib"));
app.use("/img",express.static(__dirname + "/img"));
