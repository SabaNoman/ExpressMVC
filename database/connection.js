import mongoose from "mongoose";
import 'dotenv/config';

const dbConnection = async function() {
  try{
    console.log(process.env.DATABASE_URI);
    await mongoose.connect(process.env.DATABASE_URI);    
  } catch (err) {
    console.log(err);
  } finally {
    // await client.close()
  }
  // return client;
}

export { dbConnection };