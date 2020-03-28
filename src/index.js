const express=require('express');
const path=require('path');
const morgan=require('morgan')
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');
const flash=require('connect-flash');

// Initiliazations
const app=express();
require('./database');


// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Global Variables
app.use((req,res,next)=>{
    res.locals.msg_exito = req.flash('msg_exito');
    res.locals.msg_error = req.flash('msg_error');
    res.locals.error = req.flash('error');
    res.locals.user=req.user;
    next();
});

// Routes
app.use(require('./routes/productos'));
app.use('/listas',require('./routes/listas'));
app.get('/', (req,res)=>res.redirect('/listas'));
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning
app.listen(app.get('port'), ()=>{
    console.log('Server is running on port '+app.get('port'));
});