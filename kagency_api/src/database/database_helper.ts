const pg = require("pg");
const Pool = pg.Pool;
var database: any = null;

const local = new Pool({
  user: "sp_kagency",
  password: "kagency",
  host: "localhost",
  port: 5432,
  database: "kagency_page",
});

const client = new Pool({
  connectionString:
    "postgres://iyelxhnmrsuvfh:c089a64d34a5325d25a608090f8657d245eadb72a7bd9bc9b4f2df6d4f0cb6d2@ec2-54-87-112-29.compute-1.amazonaws.com:5432/d7c53stk26hgc",
  ssl: { rejectUnauthorized: false },
});
const { NODE_ENV } = process.env;
if (NODE_ENV === "production") {
  database = client;
  console.log("Connecting to client database");
} else {
  database = local;
  console.log("Connecting to local database");
}

const connectDB = () => {
  database.connect((err: string) => {
    if (err) {
      return console.error("Could not connect to database ", err);
    }
    return console.log("Connected to database");
  });
};

const queryDB = (query: string, values: any = null) => {
  return database.query(query, values).then((result: any, err: string) => {
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

export = DatabaseHelper;
