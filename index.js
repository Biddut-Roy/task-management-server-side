const express = require('express');
require('dotenv').config();
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    credentials: true,
}));

app.use(express.json())
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

const userData = client.db("task").collection("user");
const userDataBase = client.db("task").collection("userData");

app.get('/', (req, res) => {
    res.send('check')

})


// user
app.post('/user', async (req, res) => {
    const body = req.body;
    const result = await userData.insertOne(body);
    res.send(result);
})

app.put('/user' , async (req, res) => {
    const body = req.body;
    const filter = { email: body?.email };
    const options = { upsert: true };
    const update = {
        $set: {
            email: body?.email,
            name: body?.name
        }
    }
    const result = await userData.updateOne(filter, update , options);
    res.send(result);
})

//  task data
app.get('/userData', async (req, res) => {
    const body = req.query;
    const query = {email: body?.email}
    const result = await userDataBase.find(query).toArray();
    res.send(result);
})

app.post('/userData', async (req, res) => {
    const body = req.body;
    const result = await userDataBase.insertOne(body);
    res.send(result);
})
app.patch('/userDataSC', async (req, res) => {
    const body = req.body.data;
    console.log(body);
    const filter = { mainid: body?.mainid};
    const update = {
        $set: {
            status: body?.status
        }
    }
    // const result = await userDataBase.updateOne(filter, update);
    // res.send(result);
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})