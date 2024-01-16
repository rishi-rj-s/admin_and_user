const express = require('express')
const services = require('../services/render')
const controller = require('../controller/controller')
const session = require('express-session')
const { off, getMaxListeners } = require('../model/model')
const axios = require('axios')
const {adminCheck} = require('../../util/middlewares.js')

const route = express.Router()

//@desc Root route
//method GET/
//@desc Root route
//method GET/
route.get('/', (req, res) => {
     if (req.session.user && req.session.user.role == "admin") {
          res.redirect('/home')
     } else if (req.session.user) {
          res.redirect('/userhome')
     } else {
          res.render('login')
     }
})



//@desc Admin Route
//method GET/
route.get('/home', adminCheck, (req, res) => {
     if(req.session.user){
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
     if(req.session.user && req.session.user.role != "admin"){
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

route.get('/adduser', adminCheck, services.addUser)
route.get('/updateuser', adminCheck, services.updateUser)
route.get('/search', adminCheck, services.searchUser)


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
else{
     res.redirect('/')
}
})

//API
route.route('/api/users')
  .post(controller.create)
  .get(controller.find);
route.get('/api/users/search', controller.search);
route.route('/api/users/:id')
  .put(controller.update)
  .delete(controller.delete)
route.post('/api/users/login', controller.login)

module.exports = route
