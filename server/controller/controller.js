const bcrypt = require('bcrypt')
let Userdb = require("../model/model");
const session = require('express-session')


// login
exports.login = async(req, res) => {

const {email,password}=req.body

  const users= await Userdb.findOne({email:email})
  if(users && (await bcrypt.compare(password, users.password))){
      req.session.user = users
      if(req.session.user.role == "admin"){
        res.redirect('/home')
      }else{
        res.redirect('/userhome')
      }
  }else{
    res.redirect('/')
  }
};


//create and save new user
exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send("Message content cannot be empty");
    return;
  }
  const {name, email, gender, password} = req.body
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  //new user
  const users = new Userdb({
    name: name,
    email: email,
    gender: gender,
    password: hashedPassword,
  });
  //save user in the database
  users
    .save()
    .then((data) => {
      res.redirect('/adduser');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
};

//retrieve and return all user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message: err.message || "Error while retrieving user information",
          });
      });
  }
};

// search user
exports.search = (req, res) => {
  const username = req.query.name;
  Userdb.find({ name: {$regex: new RegExp(username,'i')} })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot find with name ${username}. Maybe name is wrong!`,
          });
      } else {
        return res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Could not find user with name ${username}` });
    });
};

//update user
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data to update cannot be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update user with ${id}. Maybe user not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user information" });
    });
};

//delete user
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete({ _id: id })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong!` });
      } else {
        res.send({ message: "User successsfully deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Could not delete user with id ${id}` });
    });
};
