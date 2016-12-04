
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
// create reusable transporter object using the default SMTP transport

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'admin@progtive.com',
        pass: 'kaka123@'
    }
};
// setup e-mail data with unicode symbols
var mailOptions = {
    to: 'admin@progtive.com', // list of receivers
};
router.post('/sendMessage', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  var transporter = nodemailer.createTransport(smtpConfig);
  // send mail with defined transport object
  if (req.body) {
    mailOptions.subject = req.body.from+" - "+req.body.email;
    mailOptions.text = req.body.text;
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({"Error": console.log(error)});
        }
        res.json({"Message sent": info.response});
    });
  }else{
    res.json({"empty request": req.body});
  }

});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
