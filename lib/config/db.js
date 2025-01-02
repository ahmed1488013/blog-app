import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ahmedhamadamamh:zJ5IyDAyHwnt0YJj@cluster0.cefoz.mongodb.net/blog-app');
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};
