import path from 'path';
import { Server } from 'http';
import Express from 'express';
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var FB = require('fb');

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import ArticleAlbum from './components/ArticleAlbum';
import ArticlePhoto from './components/ArticlePhoto';


var my_token = "EAACEdEose0cBAOiSBZBzu6VB9tAYjbjyArqhdIAn8YaxWsXhYHAZBTa5R1qwgVgJnlwXRVSbdqGyjJzu2deZCtewjOgdOA8v7Nc8mxsO2buXRkuxbbqmvfxm3FdcykoOu2UGLznivn2Q3BlOyy3Ild4MDOYzIMvdZALwugMVj4UBomtuo1wVZCHxdalSudbUK9C3VnVq7LgZDZD";
FB.setAccessToken(my_token);

// initialize the server and configure support for ejs templates
const app = new Express();

const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

passport.use(new Strategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',function(req,res) {
    res.render('home') ; 
});

//Connexion to facebook
app.get('/login/facebook',
  passport.authenticate('facebook',{ scope: ['public_profile','email','user_friends', 'user_photos','manage_pages'] }));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/albums');
    
  });

//Get albums
app.get('/albums', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
                    var album = [];
                    FB.api('/me/albums','get',{"fields" : "id,name,picture"},  function (res1) {
                     if(!res1 || res1.error) {
                     console.log(!res1 ? 'error occurred' : res1.error);
                     return;
                     }else{                       
                            for(var i=0; i<res1.data.length; i++){
                               var it={};
                                           
                               it.id = res1.data[i].id;
                               it.title = res1.data[i].name;
                               it.URL = res1.data[i].picture.data.url;                               
                               album.push(it);
                                 
                            }
                                  const Ab = React.createFactory(ArticleAlbum);
                                  let AbC = Ab({albums:album });
                                  res.render('index', {markup:renderToString(AbC)}) ; 
                     }
                
                    });
           
});
  
// Get album photos  
app.get('/photos/:ID', 
   require('connect-ensure-login').ensureLoggedIn(),
   function(req, res) {
     var ID = req.params.ID;
     var photo = [];
     FB.api('/'+ID+'/photos',{"fields" : "id,height,width,source"},  function (res2) {
         if(!res2 || res2.error) {
         console.log(!res2 ? 'error occurred' : res2.error);
         return;
         }else{
           
                            for(var i=0; i<res2.data.length; i++){
                               var item={};
                                           
                               item.id = res2.data[i].id;                              
                               item.URL = res2.data[i].source;                               
                               photo.push(item);
                                 
                            }
                                  const Ab = React.createFactory(ArticlePhoto);
                                  let AbC = Ab({photos:photo });
                                  res.render('photo', {markup:renderToString(AbC)}) ; 

 
         }
     });
     
     
   });    

// start the server

server.listen(3000, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:3000`);
});