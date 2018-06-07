var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var cors = require('cors');
var db = mongojs('users', ['users']);
var ObjectId = mongojs.ObjectId;

var app = express();


// View Engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({credentials: true, origin: true}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Set Global Vars
app.use(function(req, res, next) {
    res.locals.errors = null;;
    next();
});

// Express Middleware validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param : formParam,
            msg   : msg,
            value : value 
        };
    }
}));

app.get('/', function(req, res) {
    db.users.find(function(err, docs) {
        console.log(docs);
        res.render('index', {
            title: 'users',
            users: docs
        });
    });

});

app.get('/employees', function(req, res) {
    db.users.find(function(err, docs) {
        console.log(docs);
        res.send(docs);
    });

});

app.post('/add_employee', function(req, res) {
    
    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('role', 'Role is Required').notEmpty();

    var errors = req.validationErrors();

    console.log('pOst received');

    if (errors) {
        console.log(errors);
    } else {
        
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role,
            email: req.body.email,
        }

        db.users.insert(newUser, function(err, response) {
            if(err) {
                console.log(err);
            }
            /*res.header('Access-Control-Allow-Origin', "*");*/
            console.log('response sent');
            res.send(newUser._id);
        });
    }
})

app.delete('/employees/delete/:id', function(req,res) {
    console.log(req.params.id);
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result) {
        if(err) {
            console.log(err);
        }
        res.send("Deleted");
    });
});

app.put('/employees/update/:id', (req, res, next) => {
    console.log('PUT request received');
    db.users.update(
        {_id: ObjectId(req.params.id)},
        {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                role: req.body.role,
            }
        }, (err, result) => {
            res.header('Content-Type', 'text/plain');
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                res.send("Update SUCCESS");
            }
        });

     
});

app.listen(3000, function() {
    console.log('Server Started on port 3000');
});