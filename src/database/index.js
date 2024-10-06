import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionURL = process.env.MONGODB_URL;

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Job board connection is successfull"))
    .catch((e) => console.log(e));
};

export default connectToDB;
