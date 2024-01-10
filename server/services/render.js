const axios = require('axios')
const session = require('express-session')

exports.addUser = (req, res)=>{
     if(req.session.user == "admin@gmail.com"){
          res.render('adduser')
     }
     else{
          res.redirect('/')
     }
}

exports.searchUser = (req, res)=>{
     if(req.session.user == "admin@gmail.com"){
          const userName = req.query.name
          axios.get(`http://localhost:5002/api/users/search?name=${userName}`)
          .then((response)=>{
               res.render('search',{user: response.data})
          })
          .catch(err=>{
               res.send(err)
          })
     }else{
          res.redirect('/')
     }
}

exports.updateUser = (req, res)=>{
     if(req.session.user=="admin@gmail.com"){
          axios.get('http://localhost:5002/api/users/',{params: {id: req.query.id}})
          .then(function(userdata){
               res.render('update', {user: userdata.data})
          })
          .catch(err=>{
               res.send(err.toString())
          })
     }
}
