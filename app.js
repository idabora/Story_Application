const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
require('./DB/connection')
const exphbs = require('express-handlebars')
const hbs = require('hbs');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
var bodyParser = require('body-parser');
const methodOverride = require('method-override')

const { Session } = require('express-session');


const PORT = process.env.port || '5000';
const hostname = '127.0.0.1';

const app = express();


// app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(methodOverride(function (req, res) {
    // console.log("upto here")
    // console.log(req.body)
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // console.log("upto there")
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

const staticpath = path.join(__dirname, "/public");
const partialpath = path.join(__dirname, "/views/partials");

app.use(express.static(staticpath));
hbs.registerPartials(partialpath);
//Load Config
dotenv.config({ path: './config/config.env' })

//Passport config
require('./config/passport')(passport)

// handlebars helpers
// const {formatdate}=require('./helpers/hbs')
// app.engine('hbs', hbs({helpers:{
//     formatdate,
// },extname: 'hbs'
// })
// )
app.set('view engine', '.hbs');

app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.MONGO_URL })
    // cookie:{secure : true}
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Global variable
// app.use(function(req,res,next) {
//     res.locals.user=req.user||null
//     next()
// })

//ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));



app.listen(PORT, () => {
    console.log(`server listening on port http://${hostname}:${PORT}`);
})