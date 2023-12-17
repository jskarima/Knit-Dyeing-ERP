const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');


// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');

// Auth
const Auth = require('./config/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//For Auth
app.use(session({ secret: 'whatever can input', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Auth.strategy));
passport.serializeUser(Auth.serialize);
passport.deserializeUser(Auth.deserialize);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);


app.listen(3000, () => {
  console.log('Server is Running port 3000');
});

