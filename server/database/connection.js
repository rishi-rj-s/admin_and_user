//const { MongoClient } = require('mongodb')
// const client = new MongoClient("mongodb://localhost:27017/crudexample")
// const db_connect = (onSuccess, onError) => {
//      return client.connect()
//      .then((dbClient) => {
//           if(onSuccess) onSuccess(dbClient);
//           return dbClient
//      }) .catch((err) => {
//           if (onError) onError(err);
//           return err;
//      })
// }
// module.exports = {
//      db_connect
// }

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