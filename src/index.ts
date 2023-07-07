import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database";
import { librarianRoute } from "./routes/librarian.route";
import { bookRoute } from "./routes/book.route";
import { userRoute } from "./routes/user.route";
import { membershipRoute } from "./routes/membership.route";
import { rentRoute } from "./routes/rent.route";

const app = express();
dotenv.config();

const HOST = process.env.HOST || "http://localhost";
const PORT = parseInt(process.env.PORT || "3000");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", librarianRoute());
app.use("/", bookRoute());
app.use("/", userRoute());
app.use("/", membershipRoute());
app.use("/", rentRoute());

app.listen(PORT, async() => {
    await connectToDatabase();

    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});