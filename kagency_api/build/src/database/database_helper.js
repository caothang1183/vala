"use strict";
const pg = require("pg");
const Pool = pg.Pool;
var database = null;
const local = new Pool({
    user: "sp_kagency",
    password: "kagency",
    host: "localhost",
    port: 5432,
    database: "kagency_page",
});
const client = new pg.Client({
    connectionString: "postgres://aqwsxlujidjczq:103831adc92e9969156d750c799426e6cb060114878d9ad45755c4af1d2710ea@ec2-52-4-111-46.compute-1.amazonaws.com:5432/d8c6c4p8hrsf9t",
    ssl: { rejectUnauthorized: false },
});
const { NODE_ENV } = process.env;
if (NODE_ENV === "production") {
    database = client;
    console.log("Connecting to client database");
}
else {
    database = local;
    console.log("Connecting to local database");
}
const connectDB = () => {
    database.connect((err) => {
        if (err) {
            return console.error("Could not connect to database ", err);
        }
        return console.log("Connected to database");
    });
};
const queryDB = (query) => {
    return database.query(query).then((result, err) => {
        console.log(`Excuted QUERY(${query}) on ${new Date().toISOString()}`);
        if (err) {
            throw err;
        }
        return result;
    });
};
function disconnectDB() {
    console.log("Disconnected to database");
    database.disconnect();
}
const DatabaseHelper = {
    queryDB,
    connectDB,
    disconnectDB,
};
module.exports = DatabaseHelper;
//# sourceMappingURL=database_helper.js.map