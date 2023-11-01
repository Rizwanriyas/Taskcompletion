const mongoose = require('mongoose');


const connectDB = async() =>{
  try{
      const conn = await mongoose.connect("mongodb+srv://rizwan:rizwandb@cluster0.vtvalam.mongodb.net/?retryWrites=true&w=majority",{
          useNewUrlParser:true,
          useUnifiedTopology:true,
      })

      console.log("Database connected");
  } catch (error){
      console.log(`Error :${error}`);
      process.exit();
  }
}
module.exports = connectDB