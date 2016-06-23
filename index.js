var Sequelize  = require('sequelize');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// Database connection
var sequelize = new Sequelize('heroku_cf16372df22c374', 'b994aab578c394', 'ff010d98', {
    host: 'eu-cdbr-west-01.cleardb.com',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Defines the model that stores the data of the temperature sensor
var Temperature = sequelize.define('temperature', {
    temp: {
        type: Sequelize.FLOAT,
        field: 'temp'
    }
});
Temperature.sync();

// Defines the model that store the data of the humidity sensor
var Humidity = sequelize.define('humidity', {
    hum: {
        type: Sequelize.FLOAT,
        field: 'hum'
    }
});
Humidity.sync();

// Defines the model that manages the jobs
var Job = sequelize.define('job', {
    type: {
        type: Sequelize.STRING,
        field: 'type' // "timer|humidity"
    },
    value: {
        type: Sequelize.STRING,
        field: 'value' // If humidity -> e.g "15", if timer -> e.g "1466645056021" (timestamp end)
    },
    status: {
        type: Sequelize.BOOLEAN,
        field: 'status' // True: job currently going, false: jod done or cancelled
    }
});
Job.hasMany(Temperature, {as: 'Temperatures'});
Job.hasMany(Humidity, {as: 'Humidities'});
Job.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) { res.send('Hello World!'); });

app.post('/save_temperature', function(req, res){
    
});

app.post('/save_humidity', function(req, res){

});

app.post('/start_new_job', function(req, res){
    switch (req.body.type) {
        case "timer":{

        }
            break;

        case "humidity":{

        }
            break;
    }
});

app.listen(3000);
