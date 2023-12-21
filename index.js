const express = require('express');
require('dotenv').config();
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors({
    origin:[
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    credentials: true,
}))

app.use(express.json)
app.use(cookieParser())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9sv7xbd.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
    try {
        client.connect()
        console.log('DB Connected Successfully✅')
    } catch (error) {
        console.log(error.name, error.message)
    }
}
dbConnect()


app.get('/', (req, res) => {
    res.send('check my server')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})