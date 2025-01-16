const mongoose = require('mongoose')


module.exports=()=>{

    try {
        mongoose.connect(process.env.DATABASE_KEY)
        console.log("connected  to database")
    } catch (error) {
        console.log(err.message);
        throw error
    }
}