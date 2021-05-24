"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const _database_1 = __importDefault(require("@database"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const _routers_1 = require("@routers");
dotenv_1.default.config();
_database_1.default.connectDB();
const app = express_1.default();
const port = process.env.PORT || 5000;
const ip = process.env.IP || "localhost";
//middleware
app.use(cors_1.default());
app.use(express_1.default.json());
// document
app.use(express_ejs_layouts_1.default);
app.set("view engine", "ejs");
app.use("/assets/", express_1.default.static("public/assets/"));
app.use(_routers_1.documentRoutes);
// api
app.use("/api", _routers_1.apiRoutes);
// kagency api
app.use("/kagency-api", _routers_1.kagencyApiRoutes);
// error api routes not exist
app.get("/*", (_, res) => {
    res.status(404).json({
        message: "Not Found",
        description: "Page not found",
    });
});
app.listen(port, () => console.log(`API run on port ${ip}:${port}`));
//# sourceMappingURL=server.js.map