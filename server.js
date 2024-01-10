const express = require('express')
const dotenv = require('dotenv')
const path = require("path")
const session = require('express-session')
const  nocache = require('nocache')
const connectDB = require('./server/database/connection')

dotenv.config({path: 'config.env'})
const PORT =   process.env.PORT 

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(nocache())

app.use(session({
     secret: 'your-secret-key',
     resave: false,
     saveUninitialized: true
}));
   
app.listen(PORT, ()=>{
     console.log(`Server is running on http://localhost:${PORT}`)
})


//mongodb connection
connectDB()

//set view engine
app.set("view engine", "ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))

//load routers
app.use('/', require('./server/routes/router'))