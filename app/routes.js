// grab the nerd model we just created
var User = require('./models/user');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/users', function (req, res) {
        // use mongoose to get all nerds in the database
        User.find(function (err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(users); // return all nerds in JSON format
        });
    });

    app.get('/api/users/:user_id', function (req, res) {
       User.findById(req.params.user_id, function(err, user) {
           if(err) {
               res.send(err);
           }

           res.json(user);
       });
    });

    // route to handle creating goes here (app.post)
    app.post('/api/users', function(req, res) {
       var user = new User();
        user.firstName = req.body.name;

        user.save(function(err) {
            if(err) {
                res.send(err);
            }

            res.json({'message' : 'User was created with id: ' + user.id});
        })

    });

    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};