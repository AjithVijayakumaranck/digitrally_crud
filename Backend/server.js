const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('dotenv')
const connect = require('./Connections/db')

env.config()

const allowedOrigins = [
    "http://localhost:5173",
];

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
}))


connect()

const crudRoutes = require('./Routes/crud')

app.use('/api', crudRoutes)



app.listen(8080, () => {
    console.log('server connected at port 8080');
})