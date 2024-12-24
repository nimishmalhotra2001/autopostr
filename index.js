require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const taskManager = require('./helpers/taskManager');
const path = require('path');
const app = express();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        console.warn('- Make sure you have a .env file with a correct MONGO_URI variable');
        console.warn('- Make sure you have added 0.0.0.0 to the IP Whitelist in MongoDB Atlas (in the Network Access tab)');
        process.exit(1);
    }
};

const startServer = async () => {
    await connectToMongoDB();
    app.use(express.static('public'));
    app.use(express.json());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        resave: false,
        saveUninitialized: false,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', authRoutes);
    app.use('/api', apiRoutes);

    app.get('/dashboard', async (req, res) => {
        const filePath = path.join(__dirname, 'public', 'dashboard.html');
        res.sendFile(filePath);
    });

    app.get('/legal', async (req, res) => {
        const filePath = path.join(__dirname, 'public', 'legal.html');
        res.sendFile(filePath);
    });

    app.get('/repo', async (req, res) => {
        res.redirect('https://github.com/sea-deep/autopostr')
    });

    app.use((req, res) => {
        const filePath = path.join(__dirname, 'public', '404.html');
        res.status(404).sendFile(filePath);
    });

    taskManager();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.URL}`);
    });
};

startServer();
