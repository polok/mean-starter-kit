// grab the nerd model we just created
var User = require('./models/user');

module.exports = function (app, passport) {

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

    app.put('/api/users/:user_id', function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
                res.send(err);
            }

            var u = user;
            u.firstName = req.body.name;

            u.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message : 'User was updated'});
            });
        });
    });

    app.delete('/api/users/:user_id', function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
                res.send(err);
            }

            user.remove(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message : 'User was deleted - ' + req.params.user_id});
            });
        });
    });

    // authentication
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
