import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import hotelRouter from "./routes/hotel.routes.js";
import hotelReservationRouter from "./routes/hotelReservation.routes.js";
import airlineRouter from "./routes/airline.routes.js";
import flightRouter from "./routes/flight.routes.js";
import flightReservationRouter from "./routes/flightReservation.routes.js";


// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/hotelReservation", hotelReservationRouter);
app.use("/api/v1/airlines", airlineRouter);
app.use("/api/v1/flights", flightRouter);
app.use("/api/v1/flightReservation", flightReservationRouter);

export { app };