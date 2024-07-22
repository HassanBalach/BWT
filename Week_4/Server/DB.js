import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
     const mongoDB =  await  mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(`mongoDB is successfully connnected:`);


    }catch(err){
        console.log("MONODB connecting error:", err);
        process.exit(1)

    }
}


