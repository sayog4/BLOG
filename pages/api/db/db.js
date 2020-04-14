import mongoose from "mongoose";

export default async () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  try {
    await mongoose.connect(process.env.DB_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (err) {
    console.log(err);
  }
};
