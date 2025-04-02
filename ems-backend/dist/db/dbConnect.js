import mongoose from "mongoose";
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
export default connectToDatabase;
//# sourceMappingURL=dbConnect.js.map