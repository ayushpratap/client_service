var exxpress = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoekn');
var bcrypt = require('bcryptjs');
var config = require('../config');
var User = require('../user/User');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.post('/register',function(req,res){
    var hashedPassword = bcrypt.hashSync(req.body,password,8);

    User.create({
        name : req.body.name,
        email : req.body.email,
        exten : req.body.exten,
        password : req.body.hashedPassword,
    },
    function(err, user){
        if(err)
        {
            return res.status(500).send("There is a problem regsitering the user");
        }

        // create a token
        var token = jwt.sign({id: user._id},config.secret,{
            expiresIn = 604800 // Expires in a week
        });
        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/me',function(req,res){
    var token = req.headers['x-access-token'];
    if(!token)
    {
        return res.status(401).send({auth: false, message:'No token provided.'});
    }

    jwt.verify(token, config.secret, function(err,decode){
        if(err)
        {
            return res.status(500).send({auth: false, message:'Failed to authenticate token'});
        }
        res.status(200).send(decoded);
    });
});

module.exports = router;