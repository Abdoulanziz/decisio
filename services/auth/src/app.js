require('dotenv').config({ path: '../../.env' });

const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require('../../../config/database');


const { PORT_AUTH_SERVICE, SESSION_SECRET } = process.env;
const port = PORT_AUTH_SERVICE || "8080";

const initializeAdmin = require(`../middlewares/initializeAdmin`);

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, `views`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, `public`)));
app.use(express.static(path.join(__dirname, `uploads`)));


const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    name: 'mis.connect.sid',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


sequelize
.authenticate()
.then(() => {
  sessionStore
  .sync()
  .then(() => {
    // Remove '0.0.0.0' in production
    app.listen(port, '0.0.0.0', () => {
      initializeAdmin();
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Session store sync error:', error);
  });
})
.catch(() => {
  console.log("Server failure!");
  process.exit(1);
});


app.use("/api/v1/", require(`../routes/apiRoutes`));