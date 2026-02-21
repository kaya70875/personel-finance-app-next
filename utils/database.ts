import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (cached.conn) {
        console.log("MongoDB is already connected (cached)");
        return cached.conn.connection.db; 
    }

    if (!cached.promise) {
        const opts = {
            dbName: "personel_finance_app",
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false,
            family: 4,
        };

        cached.promise = mongoose.connect(process.env.DATABASE_URI!, opts).then((mongooseInstance) => {
            console.log("New MongoDB connection established");
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn.connection.db;
    } catch (error) {
        cached.promise = null;
        console.error("MongoDB connection error:", error);
        throw error;
    }
};