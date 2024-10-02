import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

try {
    connectDB();
} catch (error) {
    console.error("Connection Failed: ", error);
    process.exit(1);
}

app.on("error", (error) => {
    console.error("ERR: ", error);
    throw error;
});

app.listen(process.env.PORT, () => {
    console.log(`Server is Running at PORT: ${process.env.PORT}`);
});