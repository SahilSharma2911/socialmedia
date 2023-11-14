const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const multer = require("multer");

const path = require("path")

const cors = require("cors");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const commentRoute = require("./routes/comment");

dotenv.config();

const app = express();

app.use(cors());

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo connected");
    } catch (error) {
        console.log(error);
        process.exit();
    }
};
connectDB();
// module.exports = connectDB;

app.use("/images",express.static(path.join(__dirname,"/public/images")));

//middleware
app.use(express.json());

app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images"); // Change the destination path
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name); // Use the original filename
    },
});

const upload = multer({ storage: storage }); // Use the storage configuration
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("file uploaded successfully");
    } catch (err) {
        console.log(err);
    }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/comment",commentRoute);

app.listen(8800, () => {
    console.log("backend server is ready");
});
