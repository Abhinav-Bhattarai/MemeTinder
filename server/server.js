import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socket from 'socket.io';
import bodyparser from 'body-parser';
import sanitizer from 'express-sanitizer';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const PORT = 8000
const server = http.createServer(app)
const io = socket(server)

// middleware
app.use(bodyparser.json({limit: '50mb'}))
app.use(sanitizer())

// Socket Connection

io.on('connection', (socket)=>{
    socket.on('disconnect', ()=>{
        console.log('user disconnect')
    })
})

// DB connection
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to mongoDB')
}).catch(()=>{
    console.log('Didnot connect to mongoDB')
})

// listener
server.listen(PORT, ()=>{
    console.log('Listening to localhost:8000')
})