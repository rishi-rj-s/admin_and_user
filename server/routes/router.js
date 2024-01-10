const express = require('express')
const services = require('../services/render')
const controller = require('../controller/controller')
const session = require('express-session')
const { off, getMaxListeners } = require('../model/model')
const axios = require('axios')

const route = express.Router()

//@desc Root route
//method GET/
route.get('/',(req, res) => {
     if(req.session.user == "admin@gmail.com"){
          res.redirect('/home')
     }
     else if(req.session.user){
          res.redirect('/userhome')
     }
     else{
          res.render('login')
     }
})


//@desc Admin Route
//method GET/
route.get('/home', (req, res) => {
     if(req.session.user == "admin@gmail.com"){
          //make a get req to /api/users
          axios.get("http://localhost:5002/api/users")
          .then(function(response){
               res.render('index',{users: response.data})
          })
          .catch(err=>{
               res.send(err)
          })
     }
     else{
          res.redirect('/')
     }
})
route.get('/userhome', (req, res) => {
     if(req.session.user != "admin@gmail.com"){
          res.render('userhome')
     }else{
          res.redirect('/')
     }
})

route.get('/register',(req, res) => {
     if(!(req.session.user)){
          res.render('register')
     }else if(req.session.user){
          res.redirect('/')
     }
})

route.get('/adduser',services.addUser)
route.get('/updateuser',services.updateUser)
route.get('/search',services.searchUser)


//@desc Logout
//method GET /logout
route.get('/logout',(req, res) =>{
     if(req.session.user){
     req.session.destroy(function(err){
          if(err){
               console.log(err)
               res.send("Error")
          }else{
               res.redirect('/')
          }
     })
}
})

//API
route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.get('/api/users/search', controller.search)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)
route.post('/api/users/login', controller.login)

module.exports = route