const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers","*");
    next();
});

app.use(cors())

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (error) {
        console.log('Server error', error.message);
        process.exit(1);
    }
}

start()
