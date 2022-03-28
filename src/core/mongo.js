import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const url = process.env.MONGO_DB_URL;

const dbConnection = async (cb, em) => {
  const connectionResult = await mongoose.connect(url, options);
  console.log(
    `Connected to mongoDB on database:
    ${connectionResult.connections[0].name} at ${new Date().toDateString()}`
  );
  if (cb && em) cb(em);
};
export default dbConnection;
