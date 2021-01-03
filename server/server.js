import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socket from 'socket.io';
import bodyparser from 'body-parser';
import sanitizer from 'express-sanitizer';
import dotenv from 'dotenv';
import cors from 'cors';

import RegisterRoute from './Routes/register-route.js';
import CheckJWTRoute from './Routes/check-jwt-route.js';
import ForgetPasswordRoute from './Routes/Password-confirmation-route.js';
import LoginRoute from './Routes/login-route.js';
import MessageRoute from './Routes/login-route.js';
import MatchesRoute from './Routes/matches-route.js';
import FriendRequestRoute from './Routes/friend-request.js';
import DeleterRoute from './Routes/delete-route.js';
import PostRoute from './Routes/posts-route.js';
import ProfileRouter from './Routes/profile-route.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socket(server);

// middleware
app.use(bodyparser.json({limit: '50mb'}));

// XSS prevention;
app.use(sanitizer());

// disabling Origin change for DDOS prevention;
app.use(cors({
    origin: 'https://localhost:3000'
}));

// Socket Connection
io.on('connection', (socket)=>{

    socket.on('join-room', (username)=>{
        socket.join(username)
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnect')
    })
});

// api Endpoints
app.use('/register', RegisterRoute);
app.use('/check', CheckJWTRoute);
app.use('/forget', ForgetPasswordRoute);
app.use('/login', LoginRoute);
app.use('/matches', MatchesRoute);
app.use('/message', MessageRoute);
app.use('/friend-requests', FriendRequestRoute);
app.use('/delete', DeleterRoute);
app.use('/post', PostRoute);
app.use('/profile', ProfileRouter);

// DB connection
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to mongoDB')
}).catch(()=>{
    console.log('Didnot connect to mongoDB')
});

// listener
server.listen(parseInt(process.env.PORT), ()=>{
    console.log('Listening to localhost:8000')
});