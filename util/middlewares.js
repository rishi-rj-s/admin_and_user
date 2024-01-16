exports.adminCheck = (req, res, next) =>{
     if(req.session.user.role== "admin"){
          next()
     }else{
          res.redirect('/')
     }
}