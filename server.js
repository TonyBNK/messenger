const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(`${__dirname}/dist`));

// Home page
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});
// Login page
app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/src/pages/login/login.html`);
});
// Registration page
app.get('/registration', (req, res) => {
    res.sendFile(`${__dirname}/src/pages/registration/registration.html`);
});
// Profile page
app.get('/profile', (req, res) => {
    res.sendFile(`${__dirname}/src/pages/profile/profile.html`);
});
// Chats page
app.get('/chats', (req, res) => {
    res.sendFile(`${__dirname}/src/pages/chats/chats.html`);
});
// Error page
app.get('/error', (req, res) => {
    res.sendFile(`${__dirname}/src/pages/error/error.html`);
});

app.listen(
    app.get('port'),
    () => console.log(`Example app listening on port ${app.get('port')}!`),
);
