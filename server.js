require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);


app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());


// Route 
app.get('/', homeHandler);
app.get('/list', listFromDatabase);
app.delete('/delete/:id', deleteDragon);
app.post('/list', addToDatabse);
app.put('/update/:id', updateDragon);
app.get('/details/:id', dragonDetails);
app.post('/location', addLocation);

// Handler Function
function homeHandler(req, res) {
    let SQL = "select * from location";
    try {
        client.query(SQL).then(data => {
            console.log(data.rows);
            res.render('pages/index', {
                data: data.rows
            });
        });
    } catch (error) {
        console.error(error);
    }
}

function listFromDatabase(req, res) {
    let SQL = `SELECT * FROM dragon`;
    client.query(SQL).then(result => {
        res.render('pages/dragon/list', {
            data: result.rows
        });
    });
}

function addToDatabse(req, res) {
    let {name, food, age, location_name} = req.body;
    let SQL = `insert into dragon(dragon_name, food, age, location_name) values($1, $2, $3, $4)`;
    let values = [name, food, age, location_name];
    client.query(SQL, values).then( result => {
        res.redirect('/list');
        // res.json(result);
    });
}

function dragonDetails(req, res) {
    let param = req.params.id;
    let SQL = `select * from dragon where id = $1`;
    let SQL1 = "select * from location";
    let values = [param];
    client.query(SQL, values).then( result => {
        client.query(SQL1).then( data => {
            res.render('pages/dragon/details', {
                data: result.rows[0],
                location: data.rows
            });
        })
    });
}

function updateDragon(req, res) {
    let param = req.params.id;
    let {name, food, age, location_name} = req.body;
    console.log(req.body);
    let SQL = `update dragon set dragon_name = $1, food = $2, age = $3, location_name = $4 where id = $5`;
    let values = [name, food, age, location_name, param];
    client.query(SQL, values).then( result => {
        res.redirect(`/details/${param}`);
    });
}

function deleteDragon(req, res) {
    let param = req.params.id;
    console.log(param);
    let sql = `delete from dragon where id = $1`;
    let values = [param];
    client.query(sql, values).then( result => {
        res.redirect('/list');
    });
}

function addLocation(req, res) {
    let {location_name} = req.body;
    let SQL = `insert into location(location_name) values($1)`;
    let values = [location_name];
    client.query(SQL, values).then( result => {
        res.redirect('/');
    });
}

// PORT Connect
client.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`I'm listinig to PORT: ${PORT}`)
        })
    });