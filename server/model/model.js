const mongoose = require('mongoose')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     let schema = new mongoose.Schema({
          name: {
               type: String,
               required: [true,"Need the name"],
          },
          email: {
               type: String,
               required: [true, "Need the email"],
               unique: true,
               validate: {
                    validator: function(value) {
                      return emailRegex.test(value);
                    },
                    message: "Invalid email format"
                    }
          },
          gender: {
               type: String,
               required: [true, "Select a gender"]
          },
          password: {
               type: String,
               required: [true, "Need a password"]
          }
     })

const Userdb = mongoose.model('userdb', schema)

module.exports = Userdb