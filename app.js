const path = require('path')
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./middleware/passport')(passport);
const app = express();
const { port } = require('./config');
const appRouter = require('./index.router');


app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(appRouter);

app.use('/auth/imageFile',express.static(path.join(__dirname,'imageFile')))

app.listen(port, () => {
    console.log(`listen at ${port}`);
})

