import cors from "cors";
import DBHelper from "@database";
import dotenv from "dotenv";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import { apiRoutes, documentRoutes }  from '@routers';

dotenv.config();
DBHelper.connectDB();
const app = express();

const port = process.env.PORT || 5000;
const ip = process.env.IP || "localhost";

//middleware
app.use(cors());
app.use(express.json());

// document
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use("/assets/", express.static("public/assets/"));
app.use(documentRoutes);

// api
app.use("/api", apiRoutes);

// error api routes not exist
app.get("/*", (_, res) => {
    res.status(404).json({
        message: "Not Found",
        description: "Page not found",
    });
});

app.listen(port, () => console.log(`API run on port ${ip}:${port}`));
