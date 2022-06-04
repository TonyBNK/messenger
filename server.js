const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(`${__dirname}/dist`));

// Home page
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(
    app.get('port'),
    () => console.log(`Example app listening on port ${app.get('port')}!`),
);
