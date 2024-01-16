const mongoose = require("mongoose")

const connectDB = async () => {
     try{
          //mongodb connection string
          const con = await mongoose.connect(process.env.MONGO_URI)
          console.log(`MongoDB connected on  ${con.connection.host}`)
     }
     catch(err){
          console.log(err.toString())
          process.exit(1)
     }
}

module.exports = connectDB
